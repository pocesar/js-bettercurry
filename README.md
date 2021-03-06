[![Build Status](https://travis-ci.org/pocesar/js-bettercurry.png?branch=master)](https://travis-ci.org/pocesar/js-bettercurry?branch=master)

[![browser support](https://ci.testling.com/pocesar/js-bettercurry.png)](https://ci.testling.com/pocesar/js-bettercurry)

# Better Curry

Because `return function(){ return fn.apply(context, Array.prototype.slice.call(arguments)); }` isn't good enough, that's why better curry.

Forget `Function.bind` and `func.apply(context, arguments)`, performance matters! For a better curry!

You won't find any other curry module that can achieve those benchmarks.

## Install

```bash
~ npm install better-curry
```

or

```bash
~ bower install better-curry
```

Works on the browser or on node.js (super duper performance on the latter)

## API

#### `BetterCurry.wrap(fn [, context[, len [, checkArguments]]])`

When the function have all arguments defined.
You can bind the new resulting function to a new context (change the `this` inside the function).

```js
function base(argument1, argument2){
    return this.data + ' ' + argument1 + argument2;
}

var based = BetterCurry.wrap(base, {data: 'hurry'});
based('up','!'); // 'hurry up!'
```

If the function doesn't have defined parameters, you can still coerce
the function to adopt a length

```js
function base(){
    return Array.prototype.slice.call(arguments).join(' + ');
}
var based = BetterCurry.wrap(base, null, 3);
based('one', 'two', 'three', 'will be ignored'); // 'one + two + three'
```

Passing a `len` of `-1` will make sure it behaves like variadic (that is, uses `fn.apply(context, Array.prototype.slice.call(arguments));`

When passing `true` to `checkArguments`, it will check if the body of the function has the `arguments` keyword.
If so, it will use a variadic function instead of a defined length.

```js
function base(){
    return Array.prototype.slice.call(arguments).join(' + ');
}
var based = BetterCurry.wrap(base, null, -1);
based('one', 'two', 'three', 'wont be ignored','its','free for all'); // 'one + two + three + wont be ignored + its + free for all'
```

Generated function will have a `__length` property, that equals to the original fn length.

You may hint the function by appending the expected length to your function (or if it's already wrapped):

```js
var myfunc = function(arg1, arg2, arg3, arg4){

};
myfunc.__length = 3;

BetterCurry.wrap(myfunc, null, true); // creates a threeArgs wrapped function
```

#### `BetterCurry.predefine(fn, args [, context[, len [, checkArguments]]])`

Predefine creates a function that, when executed, will have the
predefined arguments plus any arguments that you pass:

```js
function base(argument){
  return argument;
}
var based = BetterCurry.predefine(base, ['argument','will be ignored']);
based('this will be ignored as well'); // 'argument'
```

Variadic work as well, just remember to pass the len `-1` (or `8` if you think it will be that big...)

```js
function base(){
return Array.prototype.slice.call(arguments).join(' + ');
}
var curried = BetterCurry.predefine(base, ['1','2','3','4'], null, -1);
curried('5'); // '1 + 2 + 3 + 4 + 5'

curried = BetterCurry.predefine(base, ['1','2','3','4'], null, 5);
curried('5','6'); // '1 + 2 + 3 + 4 + 5'
```

All `-1` len are slower since it uses `Function.apply` (many times slower than `Function.call`)

When passing `true` to `checkArguments`, it will check if the body of the function has the `arguments` keyword.
If so, it will use a variadic function instead of a defined length.

Generated function will have a `__length` property, that equals to the original fn length

#### `BetterCurry.delegate(proto, target)`

A minor rewrite of [visionmedia's delegates](https://github.com/visionmedia/node-delegates) but around 13% faster

```js
var obj = {
  request: {
    _value: 1,
    function1: function(){},
    get value(){
      return this._value;
    },
    set value(val){
      this._value = val;
    },
  }
};

var delegated = BetterCurry.delegate(obj, 'request'); //all mirror functions from obj will reflect to obj.request with the same context

delegated
.method('function1')
.access('value')
.access({name: 'value', as: 'value2'})
.method({name: 'function1', as: 'function2', args:['arg1']});

//obj is now:
obj = {
  function1: function1(){/*...*/},
  function2: function1(arg1){/*...*/},
  value: /*..value..*/
  value2: /*..value..*/
  request: {/*...*/}
};
```

#### `BetterCurry.flatten(...args)`

Flattens all array-like arguments passed (`Array` and `arguments`) and append them in order:

```js
function stuff(){
    return BetterCurry.flatten([1,2,[3]], arguments);
}
stuff(1,2,3, [1,2,3]); // returns [1,2,[3],1,2,3,[1,2,3]]
```

# Test

Just regular stuff (100% coverage by the way)

```bash
npm run test
```

```bash
npm run coverage
```

```
=============================== Coverage summary ===============================
Statements   : 100% ( 138/138 ), 3 ignored
Branches     : 100% ( 330/330 ), 5 ignored
Functions    : 100% ( 30/30 )
Lines        : 100% ( 138/138 )
================================================================================
```

# Benchmark

Curious about performance? Get flabbergasted.

```bash
npm run benchmark
```

# License

```
The MIT License (MIT)

Copyright (c) 2014 Paulo Cesar

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```