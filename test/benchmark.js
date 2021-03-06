var
  Benchmark = typeof Benchmark !== 'undefined' ? Benchmark : require('benchmark').Benchmark,
  args = {
    bc: typeof BetterCurry !== 'undefined' ? BetterCurry : require('../index.js'),
    delegates: typeof require === 'function' ? require('delegates') : void 0
  },
  setup = function (){
    function Obj(){
      this.that = "that";
    }

    Obj.prototype.target = function (test){
      return this.that + test;
    };

    var inObj = new Obj();
    var fn = function (test){
      return this.that + test;
    };

    function curry(fn, context){
      return function (){
        return fn.apply(context, Array.prototype.slice.call(arguments));
      };
    }

    /* real setup */
    var bound = fn.bind(inObj);
    var curried = curry(fn, inObj);
    var wrapped = this.args.bc.wrap(fn, inObj);
    var predefined = this.args.bc.predefine(fn, ['YES'], inObj);
    var gotDelegates = typeof this.args.delegates !== 'undefined';
    if (gotDelegates) {
      var TJdelegated = {}, BCdelegated = {};
      BCdelegated.request = {
        foo: function(bar){
          return bar;
        },
        val: 0
      };
      TJdelegated.request = {
        foo: function(bar){
          return bar;
        },
        val: 0
      };
      this.args.delegates(TJdelegated, 'request').method('foo').access('val');
      this.args.bc.delegate(BCdelegated, 'request').method('foo').access('val');
    }
  },
  onError = function (event){
    console.log(String(event.message));
  },
  suite = new Benchmark.Suite();

// add tests
suite
  .add('Function#bind', {
    args: args,
    setup: setup,
    fn   : "bound('YES');",
    onError: onError
  })
  .add('Regular curry', {
    args: args,
    setup: setup,
    fn   : "curried('YES');",
    onError: onError
  })
  .add('standard apply', {
    args: args,
    setup: setup,
    fn   : "Obj.prototype.target.apply(inObj, ['YES']);",
    onError: onError
  })
  .add('standard call', {
    args: args,
    setup: setup,
    fn   : "Obj.prototype.target.call(inObj, 'YES');",
    onError: onError
  })
  .add('betterCurry wrap', {
    args: args,
    setup: setup,
    fn   : "wrapped('YES');",
    onError: onError
  })
  .add('betterCurry predefine', {
    args: args,
    setup: setup,
    fn   : "predefined('YES');",
    onError: onError
  })
  .add('Function.call on wrapped', {
    args: args,
    setup: setup,
    fn: "wrapped.call(null, 'YES');",
    onError: onError
  })
  .add('Function.apply on wrapped', {
    args: args,
    setup: setup,
    fn: "wrapped.apply(null, ['YES']);",
    onError: onError
  });

  if (args.delegates !== void 0) {
    suite
      .add('TJ delegates method', {
        args: args,
        setup: setup,
        fn: "TJdelegated.foo('YES');",
        onError: onError
      })
      .add('BetterCurry delegates method', {
        args: args,
        setup: setup,
        fn: "BCdelegated.foo('YES');",
        onError: onError
      })
      .add('TJ delegates access', {
        args: args,
        setup: setup,
        fn: "TJdelegated.val = 1; TJdelegated.val === 1;",
        onError: onError
      })
      .add('BetterCurry delegates access', {
        args: args,
        setup: setup,
        fn: "BCdelegated.val = 1; BCdelegated.val === 1;",
        onError: onError
      })
      ;
  }
  // add listeners
suite
  .on('cycle', function (event){
    console.log(String(event.target));
    if (typeof document !== 'undefined') {
      var el = document.getElementById('benchmark');
      el.innerHTML = el.innerHTML + String(event.target) + '<br/>';
    }
  })
  .on('complete', function (){
    var fastest = 'Fastest is ' + this.filter('fastest').pluck('name');
    console.log(fastest);
    if (typeof document !== 'undefined') {
      var el = document.getElementById('benchmark');
      el.innerHTML = el.innerHTML + fastest + '<br/>';
    }
  })
  .run({ async : true });
