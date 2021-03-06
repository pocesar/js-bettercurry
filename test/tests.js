/*jshint evil:true */
/*globals describe:true,BetterCurry:true,it:true,before:true,expect:true */
describe('BetterCurry', function (){
  'use strict';

  var fn = function (arg1, arg2, arg3, arg4){
      return this.data + ':' + [arg1, arg2, arg3, arg4].join(',');
    },
    fnn = function (arg1, arg2, arg3, arg4){
      return [arg1, arg2, arg3, arg4].join(',');
    },
    fs = [],
    fns = [],
    obj = {
      'fn': fnn
    },
    context = {
      data: 'contextData'
    };

  function craft(i){
    var out = [];
    for (var x = 0; x <= i; x++) {
      out.push(x);
    }
    return out;
  }

  before(function (){
    function args(number){
      var out = [];
      for (var i = 0; i <= number; i++) {
        out.push('__arg' + i);
      }
      return out;
    }

    var i, arg;

    for (i = 0; i <= BetterCurry.MAX_OPTIMIZED; i++) {
      arg = args(i);
      fs[i] = new Function(arg.join(','), 'return this.data + ":" + (' + arg.join('+') + ');');
    }
    for (i = 0; i <= BetterCurry.MAX_OPTIMIZED; i++) {
      arg = args(i);
      fns[i] = new Function(arg.join(','), 'return ' + arg.join('+') + ';');
    }
  });

  describe('predefine', function (){
    it('should bind to function context', function (){
      var
        args = ['predefined', 'arg', 'too'],
        curried = BetterCurry.predefine(fn, args, context);

      expect(curried('ok')).to.equal(context.data + ':' + args.concat(['ok']).join(','));
    });

    it('should contain the original lenght of the base function on the wrapped function', function(){
      for (var i = 1; i < fs.length; i++) {
        var args = craft(i - 1), func = BetterCurry.predefine(fs[i - 1], args);

        expect(func.__length).to.be(i);
      }
    });

    it('should work on zero length functions', function (){
      function base(){
        /*jshint validthis:true*/
        return (this != null ? (this.data) : void 0) + (arguments.length ? arguments[0] + arguments[1] : '');
      }

      var curried = BetterCurry.predefine(base, [1], context);

      expect(curried('frs')).to.be('contextData');
      curried = BetterCurry.predefine(base, [1]);

      expect(curried('gtct')).to.be('undefined');

      curried = BetterCurry.predefine(base, [1], null, 2);
      expect(curried('gtct')).to.be('undefined1gtct');
    });

    it('should work with less than the original argument list', function(){
      function base(a1, a2, a3) {
        return a1 + a2 + a3;
      }

      var curried = BetterCurry.predefine(base, ['1','2']);

      expect(curried(undefined)).to.equal('12undefined');
    });

    it('should work with additional data', function(){
      var obj = {};

      function base(a1, a2, a3, a4, a5){
        /*jshint validthis:true*/
        return [a1, a2, a3, a4, a5, arguments.length.toString(), this];
      }
      var curried = BetterCurry.predefine(base, ['1'], obj);

      expect(curried(2, 3, 4, 5)).to.eql(['1', 2, 3, 4, 5, '5', obj]);

      curried = BetterCurry.predefine(base, ['1'], obj, 6);

      expect(curried(2,3,4,5,'dummy','dummy','dummy')).to.eql(['1', 2, 3, 4, 5,'6',obj]);
    });

    it('should execute the function without a context', function (){
      var
        args = ['predefined', 'arg', 'too'],
        curried = BetterCurry.predefine(fnn, args);

      expect(curried('ok')).to.equal(args.concat(['ok']).join(','));
    });

    it('should pass all number of args with a context', function (){
      for (var i = 1; i < fs.length; i++) {
        var args = craft(i - 1), func = BetterCurry.predefine(fs[i - 1], args, context);

        expect(func.apply(null, args.concat(i))).to.be('contextData:' + (args.reduce(function (current, next){
          return current + next;
        })));
      }
    });

    it('should pass all number of args without a context', function (){
      for (var i = 1; i < fs.length; i++) {
        var args = craft(i - 1), func = BetterCurry.predefine(fns[i - 1], args);

        expect(func.apply(null, args.concat(i))).to.be(args.reduce(function (current, next){
          return current + next;
        }));
      }
    });

    it('should detect if arguments is in the body and mismatches the length', function(){
      var base = function(a1, a2){
        return arguments.join(' + ');
      };

      var curried = BetterCurry.predefine(base, [], null, 2, true);

      expect(curried.toString()).to.match(/twoArgs/);

      curried = BetterCurry.predefine(base, [], null, 1, true);

      expect(curried.toString()).to.match(/variadic/);


      base = function(a1, a2) {
        return a1 + a2;
      };

      curried = BetterCurry.predefine(base, [], null, 1, true);

      expect(curried.toString()).to.match(/oneArg/);
      expect(curried.__length).to.be(2);

      curried = BetterCurry.predefine(curried, [], null, 1, true);

      expect(curried.toString()).to.match(/twoArgs/);
      expect(curried.__length).to.be(1);
    });

    describe('should pass the examples given on readme', function (){
      it('1', function (){
        function base(argument){
          return argument;
        }

        var based = BetterCurry.predefine(base, ['argument', 'will be ignored']);
        expect(based('this will be ignored as well')).to.be('argument');
      });

      it('2', function (){
        function base(){
          return Array.prototype.slice.call(arguments).join(' + ');
        }

        var curried = BetterCurry.predefine(base, ['1', '2', '3', '4'], null, -1);
        expect(curried('5')).to.be('1 + 2 + 3 + 4 + 5');

        curried = BetterCurry.predefine(base, ['1', '2', '3', '4'], null, 5);
        expect(curried('5', '6')).to.be('1 + 2 + 3 + 4 + 5');
      });
    });
  });

  describe('wrap', function (){
    it('should bind to function context', function (){
      var
        curried = BetterCurry.wrap(fn, context);

      // fn expects 4 parameters
      expect(curried('arg1', 'arg2')).to.equal(context.data + ':' + ['arg1', 'arg2', '', ''].join(','));
    });

    it('should bind to function context but respect length', function (){
      var
        len = 2,
        curried = BetterCurry.wrap(fn, context, len);

      // fn expects 4 parameters, but set to 2
      expect(curried.length).to.be(len);
      expect(curried('arg1', 'arg2', 'doesnt', 'matter')).to.equal(context.data + ':' + ['arg1', 'arg2', '', ''].join(','));

      curried = BetterCurry.wrap(fn, context, len + 3);

      expect(curried.length).to.be(len + 3);
      expect(curried('arg1', 'arg2', 'does', 'matter', 'this doesnt')).to.equal(context.data + ':' + ['arg1', 'arg2', 'does', 'matter'].join(','));
    });

    it('should pass all number of args with a context', function (){
      for (var i = 0; i < fs.length; i++) {
        var func = BetterCurry.wrap(fs[i], context), args = craft(i);

        expect(func.apply(null, args)).to.be('contextData:' + args.reduce(function (current, next){
          return current + next;
        }));
      }
    });

    it('should detect if arguments is in the body and mismatches the length', function(){
      var base = function(a1, a2){
        return arguments.join(' + ');
      };

      var curried = BetterCurry.wrap(base, null, 2, true);

      expect(curried.toString()).to.match(/twoArgs/);

      curried = BetterCurry.wrap(base, null, 1, true);

      expect(curried.toString()).to.match(/variadic/);

      base = function(a1, a2) {
        return a1 + a2;
      };

      curried = BetterCurry.wrap(base, null, 1, true);

      expect(curried.toString()).to.match(/oneArg/);
      expect(curried.__length).to.be(2);

      curried = BetterCurry.wrap(curried, null, 1, true);

      expect(curried.toString()).to.match(/twoArgs/);
      expect(curried.__length).to.be(1);
    });

    describe('should pass the examples given on readme', function (){
      it('1', function (){
        function base(argument1, argument2){
          /*jshint validthis:true*/
          return this.data + ' ' + argument1 + argument2;
        }

        var based = BetterCurry.wrap(base, {data: 'hurry'});
        expect(based('up', '!')).to.be('hurry up!');
      });

      it('2', function (){
        function base(){
          return Array.prototype.slice.call(arguments).join(' + ');
        }

        var based = BetterCurry.wrap(base, null, 3);
        expect(based('one', 'two', 'three', 'will be ignored')).to.be('one + two + three');
      });

      it('3', function (){
        function base(){
          return Array.prototype.slice.call(arguments).join(' + ');
        }

        var based = BetterCurry.wrap(base, null, -1);
        expect(based('one', 'two', 'three', 'wont be ignored', 'its', 'free for all'))
          .to.be('one + two + three + wont be ignored + its + free for all');

      });
    });

    it('should pass all number of args without a context', function (){
      for (var i = 0; i < fs.length; i++) {
        var func = BetterCurry.wrap(fns[i]), args = craft(i);

        expect(func.apply(null, args)).to.be(args.reduce(function (current, next){
          return current + next;
        }));
      }
    });

  });

  describe('delegate', function (){

    describe('.method(name)', function (){
      it('should delegate methods', function (){
        var obj = {};

        obj.request = {
          foo: function (bar){
            expect(this).to.be(obj.request);
            return bar;
          },
          forceLen: function(){
            return arguments[0];
          }
        };

        var delegated = BetterCurry.delegate(obj, 'request')
          .method('foo')
          .method('forceLen')
          .method({name: 'forceLen', as:'force', len: 1})
          ;

        expect(obj.foo('something')).to.equal('something');
        expect(obj.forceLen('asdf')).to.equal(undefined);
        expect(obj.force('asdf')).to.equal('asdf');
      });

      it('should work with instances and functions', function(){
        var obj = function(){};

        obj.prototype.request =
        obj.request = {
          foo: function (bar){
            expect(this).to.be(obj.request);
            return bar;
          }
        };

        var newobj = new obj();

        BetterCurry.delegate(newobj, 'request').method('foo');

        expect(newobj.foo('something')).to.equal('something');

        BetterCurry.delegate(obj, 'request').method({name: 'foo', as: 'bar', args:['something']});

        expect(obj.bar('fds')).to.equal('something');
      });
    });

    describe('.getter(name)', function (){
      it('should delegate getters', function (){
        var obj = {};

        obj.request = {
          get type(){
            return 'text/html';
          }
        };

        BetterCurry.delegate(obj, 'request').getter('type');

        expect(obj.type).to.equal('text/html');
      });
    });

    describe('.setter(name)', function (){
      it('should delegate setters', function (){
        var obj = {};

        obj.request = {
          get type(){
            return this._type.toUpperCase();
          },

          set type(val){
            this._type = val;
          }
        };

        BetterCurry.delegate(obj, 'request')
          .setter('type')
          .setter({name: 'type', as: 'nono'});

        obj.nono = 'hey';
        expect(obj.request.type).to.equal('HEY');
      });
    });

    describe('.access(name)', function (){
      it('should delegate getters and setters', function (){
        var obj = {};

        obj.request = {
          get type(){
            return this._type.toUpperCase();
          },

          set type(val){
            this._type = val;
          }
        };

        BetterCurry
          .delegate(obj, 'request')
          .access({name: 'type'});

        obj.type = 'hey';
        expect(obj.type).to.equal('HEY');
      });
    });

    describe('.revoke(name, type)', function(){
      it('should remove something delegated from the object', function(){
        var obj = {};

        obj.request = {
          _me: 'truthy',
          tumble: function(){
            return 'tumble';
          },
          get me(){
            return this._me;
          },
          set me(val) {
            this._me = val;
          }
        };

        var delegated = BetterCurry.delegate(obj, 'request');
        delegated.method('tumble');
        delegated.access('me');

        expect(obj.tumble).to.be.a('function');
        expect(obj.me).to.be.ok();
        delegated.revoke('tumble', 'method');
        delegated.revoke('me', 'access');
        expect(obj.tumble).to.be.an('undefined');
        expect(obj.me).to.be.an('undefined');
      });

      it('shouldnt remove something that wasnt set by delegate', function(){
        var obj = {
          tremble: function(){

          },
          set generate(val) {
            var g = val;
            return g;
          },
          get generate() {

            return true;
          }
        };

        obj.request = {
          tumble: function(){
            return 'tumble';
          }
        };

        var delegated = BetterCurry.delegate(obj, 'request');
        expect(obj.tremble).to.be.a('function');
        expect(obj.generate).to.be.ok();
        delegated.revoke('tremble', 'method');
        delegated.revoke('generate', 'setter');
        expect(obj.tremble).to.be.a('function');
        expect(obj.generate).to.be.ok();
      });

      it('should delegate all setters, getters, methods automatically', function(){
        function getObj(){
          var obj = {};

          obj.request = {
            tumble: function(){
              return 'tumble';
            },
            tremble: function(){
              return this.generate;
            },
            set generate(val) {
              var g = val;
              return g;
            },
            get generate() {
              return true;
            },
            value: 1,
            ok: {
              isTrue: true,
              sub: function(){

              }
            }
          };
          return obj;
        }

        var obj = getObj();
        var delegated = BetterCurry.delegate(obj, 'request');
        delegated.all();
        expect(obj.tumble()).to.be('tumble');
        expect(obj.tremble()).to.be(true);
        expect(obj.generate).to.be(true);
        expect(obj.value).to.be(1);
        expect(obj.ok).to.eql(obj.request.ok);

        obj = getObj();
        delegated = BetterCurry.delegate(obj, 'request');
        delegated.all(['tumble']);
        expect(obj.tumble).to.be.an('undefined');
        expect(obj.tremble()).to.be(true);
      });
    });
  });

  describe('flatten', function(){
    it('should flatten a mix of arguments and arrays', function(){
      function stuff(){
          return BetterCurry.flatten([1,2,[3]], 'a', arguments);
      }

      expect(stuff(1,2,3, [1,2,3])).to.eql([1,2,[3],'a',1,2,3,[1,2,3]]);
    });
  });
});