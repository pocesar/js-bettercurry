[![Build Status](https://travis-ci.org/pocesar/js-bettercurry.png?branch=master)](https://travis-ci.org/pocesar/js-bettercurry?branch=master)

Better Curry
=================

# WHY?

Because `return function(){ return fn.apply(context, Array.prototype.slice.call(arguments)); }` isn't good enough, that's why better curry.

You won't find any other curry module that can achieve those benchmarks.

# Install

```bash
~ npm install better-curry
```

or

```bash
~ bower install better-curry
```

Works on the browser or on node.js (super duper performance on the latter)

# API

### `BetterCurry.wrap(fn, [context], [len])`

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

```js
function base(){
    return Array.prototype.slice.call(arguments).join(' + ');
}
var based = BetterCurry.wrap(base, null, -1);
based('one', 'two', 'three', 'wont be ignored','its','free for all'); // 'one + two + three + wont be ignored + its + free for all'
```

### `BetterCurry.predefine(fn, args, [context], [len])`

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

All `-1` len are slower since it uses `Function.apply` (many times slower than `Function.call` and `Array.prototype.slice` + `concat`)

# Test

Just regular stuff (100% coverage by the way)

```bash
npm run test
```

```
Statements: 100% (41 / 41)
Branches: 100% (195 / 195)
Functions: 100% (16 / 16)
Lines: 100% (41 / 41)
Ignored: 3 statements, 5 branches
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