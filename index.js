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

      instead = function (xarg, index){
        var ret = remaining-- < -1 ? xarg : (themArgs[rlen + i++] = xarg, themArgs[index]);
        return ret;
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
            fn(
              instead ? instead(arg1, 0) : arg1
            )
            : fn.call(context,
            instead ? instead(arg1, 0) : arg1
          );
        };
      case 2:
        return function twoArgs(arg1, arg2){
          return noContext ?
            fn(
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
            fn(
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
            fn(
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
            fn(
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
            fn(
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
            fn(
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
            fn(
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
      case 9:
        return function nineArgs(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9){
          return noContext ?
            fn(
              instead ? instead(arg1, 0) : arg1,
              instead ? instead(arg2, 1) : arg2,
              instead ? instead(arg3, 2) : arg3,
              instead ? instead(arg4, 3) : arg4,
              instead ? instead(arg5, 4) : arg5,
              instead ? instead(arg6, 5) : arg6,
              instead ? instead(arg7, 6) : arg7,
              instead ? instead(arg8, 7) : arg8,
              instead ? instead(arg9, 8) : arg9
            )
            : fn.call(context,
            instead ? instead(arg1, 0) : arg1,
            instead ? instead(arg2, 1) : arg2,
            instead ? instead(arg3, 2) : arg3,
            instead ? instead(arg4, 3) : arg4,
            instead ? instead(arg5, 4) : arg5,
            instead ? instead(arg6, 5) : arg6,
            instead ? instead(arg7, 6) : arg7,
            instead ? instead(arg8, 7) : arg8,
            instead ? instead(arg9, 8) : arg9
          );
        };
      case 10:
        return function tenArgs(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10){
          return noContext ?
            fn(
              instead ? instead(arg1, 0) : arg1,
              instead ? instead(arg2, 1) : arg2,
              instead ? instead(arg3, 2) : arg3,
              instead ? instead(arg4, 3) : arg4,
              instead ? instead(arg5, 4) : arg5,
              instead ? instead(arg6, 5) : arg6,
              instead ? instead(arg7, 6) : arg7,
              instead ? instead(arg8, 7) : arg8,
              instead ? instead(arg9, 8) : arg9,
              instead ? instead(arg10, 9) : arg10
            )
            : fn.call(context,
            instead ? instead(arg1, 0) : arg1,
            instead ? instead(arg2, 1) : arg2,
            instead ? instead(arg3, 2) : arg3,
            instead ? instead(arg4, 3) : arg4,
            instead ? instead(arg5, 4) : arg5,
            instead ? instead(arg6, 5) : arg6,
            instead ? instead(arg7, 6) : arg7,
            instead ? instead(arg8, 7) : arg8,
            instead ? instead(arg9, 8) : arg9,
            instead ? instead(arg10, 9) : arg10
          );
        };
    }

    // really? 11 args?
    if (themArgs.length) {
      return function variadic(){
        return fn.apply(context, themArgs.concat(Array.prototype.slice.call(arguments)));
      };
    } else {
      return function variadic(){
        return fn.apply(context, arguments);
      };
    }
  }

  /**
   * Wrap a function keeping it's context or creating another
   *
   * @param {Function} fn Original function
   * @param {*} [context] The "this" context of the newly created function
   * @param {Number} [len] Number of arguments the function receives
   * @returns {*}
   */
  function Wrap(fn, context, len){
    len = len || fn.length;

    context = context || null;

    return template(fn, len, context);
  }

  /**
   * Wraps a function in another context and predefine some arguments
   *
   * @param {Function} fn Original function
   * @param {Array} [args] Array of arguments to prepend to the function
   * @param {*} [context] The "this" context of the newly created function
   * @param {Number} [len] Number of arguments the function receives
   * @returns {*}
   */
  function Predefine(fn, args, context, len){
    len = len || fn.length;

    context = context || null;

    args = Array.prototype.concat(args);

    return template(fn, len, context, args);
  }

  /**
   * Creates a new chain of delegations on the object
   *
   * @param {Object} proto
   * @param {String} target
   * @constructor
   */
  function Delegate(proto, target){
    if (!(this instanceof Delegate)) {
      return new Delegate(proto, target);
    }
    this.proto = proto;
    this.target = target;
    this.methods = [];
    this.getters = [];
    this.setters = [];
  }

  function extract(name){
    var
      obj = typeof name === 'object',
      _name = obj ? (typeof name.as === 'string' ? name.as : name.name) : name,
      _len = obj ? (typeof name.len === 'number' ? name.len : void 0) : void 0,
      _args = obj ? (typeof name.args !== 'undefined' ? name.args : false) : false;

    return {
      target: obj ? name.name : name,
      name: _name,
      len: _len,
      args: _args
    };
  }
  /**
   * Setup a function
   *
   * @param {String|Object} name Name of the function or configuration object
   * @returns {Delegate}
   */
  Delegate.prototype.method = function (name){
    var
      opts = extract(name),
      proto = this.proto,
      target = this.target;

    this.methods.push(opts.name);

    proto[opts.name] = opts.args ?
      Predefine(proto[target][opts.target], opts.args, proto[target], opts.len) :
      Wrap(proto[target][opts.target], proto[target], opts.len);

    return this;
  };

  /**
   * Setup a setter
   *
   * @param {String|Object} name Name of the function or configuration object
   * @returns {Delegate}
   */
  Delegate.prototype.getter = function (name){
    var
      opts = extract(name),
      proto = this.proto,
      target = this.target;

    this.getters.push(opts.name);

    Object.defineProperty(proto, opts.name, {
      get         : function (){
        return this[target][opts.target];
      },
      enumerable  : true,
      configurable: true
    });

    return this;
  };

  /**
   * Setup a setter
   *
   * @param {String|Object} name Name of the function or configuration object
   * @returns {Delegate}
   */
  Delegate.prototype.setter = function (name){
    var
      opts = extract(name),
      proto = this.proto,
      target = this.target;

    this.setters.push(opts.name);

    Object.defineProperty(proto, opts.name, {
      set         : function (val){
        this[target][opts.target] = val;
      },
      enumerable  : true,
      configurable: true
    });

    return this;
  };

  /**
   * Setup getter and setter
   *
   * @param {String|Object} name Name of the function or configuration object
   * @returns {Delegate}
   */
  Delegate.prototype.access = function (name){
    return this.getter(name).setter(name);
  };

  /**
   * Revokes a delegated method, access, setter or getter
   *
   * @param {String} name Name of the function
   * @param {String} type Must be either method, access, setter or getter
   * @returns {Delegate}
   */
  Delegate.prototype.revoke = function (name, type){
    if (typeof this.proto[name] !== 'undefined') {
      var pos;
      switch (type) {
        case 'access':
          this.revoke(name, 'getter');
          this.revoke(name, 'setter');
          break;
        case 'setter':
        case 'method':
        case 'getter':
          pos = this[type + 's'].indexOf(name);
          if (pos > -1) {
            this[type + 's'].splice(pos, 1);
            delete this.proto[name];
          }
          break;
      }
    }

    return this;
  };

  return {
    wrap     : Wrap,
    predefine: Predefine,
    delegate : Delegate,
    MAX_OPTIMIZED: 10
  };
}));