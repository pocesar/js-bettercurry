(function (root, factory){
  'use strict';

  /*istanbul ignore next:cant test*/
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else {
    // Browser globals
    root.BetterCurry = factory();
  }
}(this, function (){
  'use strict';

  function template(fn, len, context, args){
    var
      noContext = context === null,
      themArgs = [],
      instead = false;

    if (typeof args !== 'undefined' && args.length && (len > 0 || len === -1)) {
      themArgs = Array.prototype.slice.call(args);

      var
        i = 0, rlen = themArgs.length,
        remaining = rlen;

      instead = function(xarg, index){
        return remaining-- < 1 ? xarg : themArgs[rlen + i++] = xarg, themArgs[index];
      };
    }

    switch (len) {
      case 0:
        return function zeroArgs(){
          return noContext ?
              fn()
            : fn.call(context);
        };
      case 1:
        return function oneArg(arg1){
          return noContext ?
              fn (
                instead ? instead(arg1, 0) : arg1
              )
            : fn.call(context,
                instead ? instead(arg1, 0) : arg1
              );
        };
      case 2:
        return function twoArgs(arg1, arg2){
          return noContext ?
              fn (
                instead ? instead(arg1, 0) : arg1,
                instead ? instead(arg2, 1) : arg2
              )
            : fn.call(context,
                instead ? instead(arg1, 0) : arg1,
                instead ? instead(arg2, 1) : arg2
              );
        };
      case 3:
        return function threeArgs(arg1, arg2, arg3){
          return noContext ?
              fn (
                instead ? instead(arg1, 0) : arg1,
                instead ? instead(arg2, 1) : arg2,
                instead ? instead(arg3, 2) : arg3
              )
            : fn.call(context,
                instead ? instead(arg1, 0) : arg1,
                instead ? instead(arg2, 1) : arg2,
                instead ? instead(arg3, 2) : arg3
              );
        };
      case 4:
        return function fourArgs(arg1, arg2, arg3, arg4){
          return noContext ?
              fn (
                instead ? instead(arg1, 0) : arg1,
                instead ? instead(arg2, 1) : arg2,
                instead ? instead(arg3, 2) : arg3,
                instead ? instead(arg4, 3) : arg4
              )
            : fn.call(context,
                instead ? instead(arg1, 0) : arg1,
                instead ? instead(arg2, 1) : arg2,
                instead ? instead(arg3, 2) : arg3,
                instead ? instead(arg4, 3) : arg4
              );
        };
      case 5:
        return function fiveArgs(arg1, arg2, arg3, arg4, arg5){
          return noContext ?
              fn (
                instead ? instead(arg1, 0) : arg1,
                instead ? instead(arg2, 1) : arg2,
                instead ? instead(arg3, 2) : arg3,
                instead ? instead(arg4, 3) : arg4,
                instead ? instead(arg5, 4) : arg5
              )
            : fn.call(context,
                instead ? instead(arg1, 0) : arg1,
                instead ? instead(arg2, 1) : arg2,
                instead ? instead(arg3, 2) : arg3,
                instead ? instead(arg4, 3) : arg4,
                instead ? instead(arg5, 4) : arg5
              );
        };
      case 6:
        return function sixArgs(arg1, arg2, arg3, arg4, arg5, arg6){
          return noContext ?
              fn (
                instead ? instead(arg1, 0) : arg1,
                instead ? instead(arg2, 1) : arg2,
                instead ? instead(arg3, 2) : arg3,
                instead ? instead(arg4, 3) : arg4,
                instead ? instead(arg5, 4) : arg5,
                instead ? instead(arg6, 5) : arg6
              )
            : fn.call(context,
                instead ? instead(arg1, 0) : arg1,
                instead ? instead(arg2, 1) : arg2,
                instead ? instead(arg3, 2) : arg3,
                instead ? instead(arg4, 3) : arg4,
                instead ? instead(arg5, 4) : arg5,
                instead ? instead(arg6, 5) : arg6
              );
        };
      case 7:
        return function sevenArgs(arg1, arg2, arg3, arg4, arg5, arg6, arg7){
          return noContext ?
              fn (
                instead ? instead(arg1, 0) : arg1,
                instead ? instead(arg2, 1) : arg2,
                instead ? instead(arg3, 2) : arg3,
                instead ? instead(arg4, 3) : arg4,
                instead ? instead(arg5, 4) : arg5,
                instead ? instead(arg6, 5) : arg6,
                instead ? instead(arg7, 6) : arg7
              )
            : fn.call(context,
                instead ? instead(arg1, 0) : arg1,
                instead ? instead(arg2, 1) : arg2,
                instead ? instead(arg3, 2) : arg3,
                instead ? instead(arg4, 3) : arg4,
                instead ? instead(arg5, 4) : arg5,
                instead ? instead(arg6, 5) : arg6,
                instead ? instead(arg7, 6) : arg7
              );
        };
      case 8:
        return function eightArgs(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8){
          return noContext ?
              fn (
                instead ? instead(arg1, 0) : arg1,
                instead ? instead(arg2, 1) : arg2,
                instead ? instead(arg3, 2) : arg3,
                instead ? instead(arg4, 3) : arg4,
                instead ? instead(arg5, 4) : arg5,
                instead ? instead(arg6, 5) : arg6,
                instead ? instead(arg7, 6) : arg7,
                instead ? instead(arg8, 7) : arg8
              )
            : fn.call(context,
                instead ? instead(arg1, 0) : arg1,
                instead ? instead(arg2, 1) : arg2,
                instead ? instead(arg3, 2) : arg3,
                instead ? instead(arg4, 3) : arg4,
                instead ? instead(arg5, 4) : arg5,
                instead ? instead(arg6, 5) : arg6,
                instead ? instead(arg7, 6) : arg7,
                instead ? instead(arg8, 7) : arg8
              );
        };
    }

    // really? 9 args?
    return function variadic(){
      return fn.apply(context, themArgs.concat(Array.prototype.slice.call(arguments)));
    };
  }

  return {
    wrap: function(fn, context, len){
      len = len || fn.length;

      context = context || null;

      return template(fn, len, context);
    },
    predefine: function(fn, args, context, len){
      len = len || fn.length;

      context = context || null;

      return template(fn, len, context, args);
    }
  };
}));