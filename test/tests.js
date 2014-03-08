describe('BetterCurry', function(){

  var fn = function(arg1, arg2, arg3, arg4){
      return this.data + ':' + [arg1,arg2,arg3,arg4].join(',');
    },
    fnn = function(arg1,arg2,arg3,arg4){
      return [arg1,arg2,arg3,arg4].join(',');
    },
    fs = [],
    fns = [],
    obj = {
      'fn': fnn
    },
    context = {
      data: 'contextData'
    };

  function craft(i) {
    var out = [];
    for(var x = 0; x <= i; x++) {
      out.push(Math.round((Math.random()*20) + 1));
    }
    return out;
  }

  before(function(){
    function args(number) {
      var out = [];
      for(var i = 0; i <= number; i++) {
        out.push('__arg' + i);
      }
      return out;
    }
    var i, arg;

    for(i = 0; i < 9; i++) {
      arg = args(i);
      fs[i] = new Function(arg.join(','), 'return this.data + ":" + (' + arg.join('+') + ');');
    }
    for(i = 0; i < 9; i++) {
      arg = args(i);
      fns[i] = new Function(arg.join(','), 'return ' + arg.join('+') + ';');
    }
  });

  describe('predefine', function(){
    it('should bind to function context', function(){
      var
        args = ['predefined','arg','too'],
        curried = BetterCurry.predefine(fn, args, context);

      expect(curried('ok')).to.equal(context.data + ':' + args.concat(['ok']).join(','));
    });

    it('should work on zero length functions', function(){
      function base(){
        return this.data + (arguments.length ? arguments[0] + arguments[1] : '');
      }
      var curried = BetterCurry.predefine(base, [1], context);

      expect(curried('frs')).to.be('contextData');
      curried = BetterCurry.predefine(base, [1]);

      expect(curried('gtct')).to.be('undefined');

      curried = BetterCurry.predefine(base, [1], null, 2);
      expect(curried('gtct')).to.be('undefined1gtct');
    });

    it('should execute the function without a context', function(){
      var
        args = ['predefined','arg','too'],
        curried = BetterCurry.predefine(fnn, args);

      expect(curried('ok')).to.equal(args.concat(['ok']).join(','));
    });

    it('should pass all number of args with a context', function(){
      for(var i = 1; i < fs.length; i++) {
        var args = craft(i - 1), func = BetterCurry.predefine(fs[i - 1], args, context);

        expect(func.apply(null, args.concat(i))).to.be('contextData:' + (args.reduce(function(current, next){
          return current + next;
        })));
      }
    });

    it('should pass all number of args without a context', function(){
      for(var i = 1; i < fs.length; i++) {
        var args = craft(i - 1), func = BetterCurry.predefine(fns[i - 1], args);

        expect(func.apply(null, args.concat(i))).to.be(args.reduce(function(current, next){
          return current + next;
        }));
      }
    });

    describe('should pass the examples given on readme', function(){
      it('1', function(){
        function base(argument){
          return argument;
        }
        var based = BetterCurry.predefine(base, ['argument','will be ignored']);
        expect(based('this will be ignored as well')).to.be('argument');
      });

      it('2', function(){
        function base(){
        return Array.prototype.slice.call(arguments).join(' + ');
        }
        var curried = BetterCurry.predefine(base, ['1','2','3','4'], null, -1);
        expect(curried('5')).to.be('1 + 2 + 3 + 4 + 5');

        curried = BetterCurry.predefine(base, ['1','2','3','4'], null, 5);
        expect(curried('5','6')).to.be('1 + 2 + 3 + 4 + 5');
      });
    });
  });

  describe('wrap', function(){
    it('should bind to function context', function(){
      var
        curried = BetterCurry.wrap(fn, context);

      // fn expects 4 parameters
      expect(curried('arg1','arg2')).to.equal(context.data + ':' + ['arg1','arg2','',''].join(','));
    });

    it('should bind to function context but respect length', function(){
      var
        len = 2,
        curried = BetterCurry.wrap(fn, context, len);

      // fn expects 4 parameters, but set to 2
      expect(curried.length).to.be(len);
      expect(curried('arg1','arg2','doesnt','matter')).to.equal(context.data + ':' + ['arg1','arg2','',''].join(','));

      curried = BetterCurry.wrap(fn, context, len + 3);

      expect(curried.length).to.be(len + 3);
      expect(curried('arg1','arg2','does','matter','this doesnt')).to.equal(context.data + ':' + ['arg1','arg2','does','matter'].join(','));
    });

    it('should pass all number of args with a context', function(){
      for(var i = 0; i < fs.length; i++) {
        var func = BetterCurry.wrap(fs[i], context), args = craft(i);

        expect(func.apply(null, args)).to.be('contextData:' + args.reduce(function(current, next){
          return current + next;
        }));
      }
    });

    describe('should pass the examples given on readme', function(){
      it('1', function(){
        function base(argument1, argument2){
            return this.data + ' ' + argument1 + argument2;
        }

        var based = BetterCurry.wrap(base, {data: 'hurry'});
        expect(based('up','!')).to.be('hurry up!');
      });

      it('2', function(){
        function base(){
          return Array.prototype.slice.call(arguments).join(' + ');
        }
        var based = BetterCurry.wrap(base, null, 3);
        expect(based('one', 'two', 'three', 'will be ignored')).to.be('one + two + three');
      });

      it('3', function(){
        function base(){
            return Array.prototype.slice.call(arguments).join(' + ');
        }
        var based = BetterCurry.wrap(base, null, -1);
        expect(based('one', 'two', 'three', 'wont be ignored','its','free for all'))
          .to.be('one + two + three + wont be ignored + its + free for all');

      });
    });

    it('should pass all number of args without a context', function(){
      for(var i = 0; i < fs.length; i++) {
        var func = BetterCurry.wrap(fns[i]), args = craft(i);

        expect(func.apply(null, args)).to.be(args.reduce(function(current, next){
          return current + next;
        }));
      }
    });

  });
});