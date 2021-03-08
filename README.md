# meari

 ![npm](https://img.shields.io/npm/v/meari) [![](https://data.jsdelivr.com/v1/package/npm/meari/badge)](https://www.jsdelivr.com/package/npm/meari) ![npm bundle size](https://img.shields.io/bundlephobia/min/meari) ![npm](https://img.shields.io/npm/dm/meari) ![NPM](https://img.shields.io/npm/l/meari)

The library which will be able to handle promises as various ways

# Concept

This library because it is based only a promise constructor so is not need a browsers of higher version supporting [Promise.all](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) or [Promise.allSettled](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled) functions

> For examples `seq` and `seqAll` functions will be able to replaces `Promise.all` and `Promise.allSettled` functions

In addition, it is supporting various functions like `map` and `retry` that in the native is not supports for can using in a multiple situations     
 
# Install
 
 ```javascript
 npm i meari
 ```
 
# Support Platforms

Most of modern browsers(chrome, edge, firefox ...) that supporting [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), NodeJS


# How to Use

## Execution order-based apis

These features are based execution order like a `Promise.all` and `Promise.race` of a native api
 
```javascript
import {
  seq,
  seqAll,
  map,
  mapAll,
  race,
  raceAll,
  retry,
  retryAll,
  assert,
  assertAll,
} from 'meari';

let p1, p2, p3;

p1 = Promise.resolve(1);
p2 = Promise.resolve(2);
p3 = Promise.resolve(3);

seq([p1, p2, p3])
  .then(values => {
    console.log(values);
    /*
    [
      { status: 'fulfilled', value: 1, index: 0 },
      { status: 'fulfilled', value: 2, index: 1 },
      { status: 'fulfilled', value: 3, index: 2 }
    ]
     */
  })
  .catch(v => {
    console.log(v);
  })
  .finally(() => {
    console.log('finally');
  });

p1 = Promise.resolve(1);
p2 = Promise.reject(new Error());
p3 = Promise.resolve(3);

seqAll([p1, p2, p3])
  .then(values => {
    console.log(values);
    /*
    [
      { status: 'fulfilled', value: 1, index: 0 },
      {
        status: 'rejected',
        value: Error:
          at Object.<anonymous> (/Users/user/htdocs/mohwa/async-trainer/examples/index.js:27:27)
          ...
        index: 1
      },
      { status: 'fulfilled', value: 3, index: 2 }
    ]
     */
  })
  .finally(() => {
    console.log('finally');
  });

p1 = Promise.resolve(1);
p2 = Promise.resolve(2);
p3 = Promise.resolve(3);

map([p1, p2, p3], ({ value }) => `TEST_${value}`)
  .then(values => {
    console.log(values); // [ 'TEST_1', 'TEST_2', 'TEST_3' ]
  })
  .catch(e => {
    console.dir(e);
  })
  .finally(() => {
    console.log('finally');
  });

p1 = Promise.resolve(1);
p2 = Promise.reject(new Error());
p3 = Promise.resolve(3);

mapAll([p1, p2, p3], ({ status, value }) => {
  if (status !== 'rejected') {
    return `TEST_${value}`;
  } else {
    return value;
  }
})
  .then(values => {
    console.log(values);
    /*
      [
        'TEST_1',
        Error:
            at Object.<anonymous> (/Users/user/htdocs/mohwa/async-trainer/examples/index.js:68:27)
            ...
        'TEST_3'
      ]    
     */
  })
  .finally(() => {
    console.log('finally');
  });

p1 = Promise.resolve(1);
p2 = Promise.resolve(2);
p3 = Promise.resolve(3);

race([p1, p2, p3])
  .then(values => {
    console.log(values);
    /*
    [
      { status: 'fulfilled', value: 1, index: 0 },
      { status: 'fulfilled', value: 2, index: 1 },
      { status: 'fulfilled', value: 3, index: 2 }
    ]    
     */
  })
  .catch(e => {
    console.dir(e);
  })
  .finally(() => {
    console.log('finally');
  });

p1 = Promise.resolve(1);
p2 = Promise.reject(new Error());
p3 = Promise.resolve(3);

raceAll([p1, p2, p3])
  .then(values => {
    console.log(values);
    /*
    [
      { status: 'fulfilled', value: 1, index: 0 },
      { status: 'fulfilled', value: 3, index: 2 },
      {
        status: 'rejected',
        value: Error:
            at Object.<anonymous> (/Users/user/htdocs/mohwa/async-trainer/examples/index.js:117:27)
            ...
        index: 1
      }
    ]    
     */
  })
  .finally(() => {
    console.log('finally 1');
  });

p1 = () => Promise.resolve(1);
p2 = () => Promise.resolve(2);
p3 = () => Promise.resolve(3);

retry([p1, p2, p3], 3, 1000)
  .then(values => {
    console.log(values);
    /*
    [
      { status: 'fulfilled', value: 1, index: 0 },
      { status: 'fulfilled', value: 2, index: 1 },
      { status: 'fulfilled', value: 3, index: 2 }
    ]
     */
  })
  .catch(value => {
    console.log(value);
  });

p1 = () => Promise.resolve(1);
p2 = () => Promise.reject(new Error());
p3 = () => Promise.resolve(3);

retryAll([p1, p2, p3], 3, 1000).then(values => {
  console.log(values);
  /*
  [
    { status: 'fulfilled', value: 1, index: 0 },
    {
      status: 'rejected',
      value: Error:
          at callback (/Users/user/htdocs/mohwa/async-trainer/examples/index.js:161:33)
          ...
      index: 1
    },
    { status: 'fulfilled', value: 3, index: 2 }
  ]  
   */
});

let cb1, cb2, cb3;

cb1 = () => true;
cb2 = () => true;
cb3 = () => true;

assert([cb1, cb2, cb3], 3, 1000)
  .then(values => {
    console.log(values);
    /*
    [
      { status: 'truly', value: true, index: 0 },
      { status: 'truly', value: true, index: 1 },
      { status: 'truly', value: true, index: 2 }
    ]    
     */
  })
  .catch(value => {
    console.log(value);
  });

cb1 = () => true;
cb2 = () => false;
cb3 = () => true;

assertAll([cb1, cb2, cb3], 3, 1000)
  .then(values => {
    console.log(values);
    /*
    [
      { status: 'truly', value: true, index: 0 },
      { status: 'falsely', value: false, index: 1 },
      { status: 'truly', value: true, index: 2 }
    ]    
     */
  });
```

## Main apis

These features are can use more easily and simply sometimes in certain situation

```javascript
import {
  once,
  delay,
  every,
  some,
  toSync
} from 'meari';

once(() => { console.log('once'); }, 1000)(); // once

delay(1000).then(() => { console.log('start'); }); // start

let p1, p2, p3;

p1 = Promise.resolve(1);
p2 = Promise.resolve(2);
p3 = Promise.resolve(3);

every([p1, p2, p3]).then(v => {
  console.log(v); // true
});

p1 = Promise.reject(1);
p2 = Promise.reject(2);
p3 = Promise.resolve(3);

some([p1, p2, p3]).then(v => {
  console.log(v); // true
});

p1 = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(1), 300);
  });
};

p2 = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(2), 100);
  });
};

toSync(p1()).then(v => console.log(v));
toSync(p2()).then(v => console.log(v));

// 1
// 2
```

## Functions

<dl>
<dt><a href="#once">once([callback], [delayTime])</a> ⇒ <code>function</code></dt>
<dd><p>This function calls callback function only once as the async after given delayTime(created timerId will be automatically dispose after performed it)</p>
</dd>
<dt><a href="#delay">delay([delayTime])</a> ⇒ <code>Promise</code></dt>
<dd><p>This function will delay code execution for given delayTime</p>
</dd>
<dt><a href="#seq">seq(promises)</a> ⇒ <code>Promise</code></dt>
<dd><p>This function returns an array which containing every results performed in order of a promises if haven&#39;t been rejected</p>
</dd>
<dt><a href="#seqAll">seqAll(promises)</a> ⇒ <code>Promise</code></dt>
<dd><p>This function returns an array which containing every results performed in order of a promises</p>
</dd>
<dt><a href="#map">map(promises, callback, context)</a> ⇒ <code>Promise</code></dt>
<dd><p>This function returns an array which containing every results performed in order of a promises if haven&#39;t been rejected</p>
</dd>
<dt><a href="#mapAll">mapAll(promises, callback, context)</a> ⇒ <code>Promise</code></dt>
<dd><p>This function returns an array which containing every results performed in order of a promises</p>
</dd>
<dt><a href="#race">race(promises)</a> ⇒ <code>Promise</code></dt>
<dd><p>This function returns an array which containing every results in order a promise performed if haven&#39;t been rejected</p>
</dd>
<dt><a href="#raceAll">raceAll(promises)</a> ⇒ <code>Promise</code></dt>
<dd><p>This function returns an array which containing every results in order a promise performed</p>
</dd>
<dt><a href="#retry">retry(callbacks, [retryCount], [delayTime])</a> ⇒ <code>Promise</code></dt>
<dd><p>This function retry a callback function as much as given retryCount to until fulfilled each a promise if haven&#39;t been rejected</p>
</dd>
<dt><a href="#retryAll">retryAll(callbacks, [retryCount], [delayTime])</a> ⇒ <code>Promise</code></dt>
<dd><p>This function retry a callback function as much as given retryCount to until fulfilled each a promise</p>
</dd>
<dt><a href="#assert">assert(callbacks, [retryCount], [delayTime])</a> ⇒ <code>Promise</code></dt>
<dd><p>This function retry a callback function as much as given retryCount to until each callback function returns true if haven&#39;t been rejected</p>
</dd>
<dt><a href="#assertAll">assertAll(callbacks, [retryCount], [delayTime])</a> ⇒ <code>Promise</code></dt>
<dd><p>This function retry a callback function as much as given retryCount to until each callback function returns true</p>
</dd>
<dt><a href="#every">every(promises)</a> ⇒ <code>Promise</code></dt>
<dd><p>This function returns true when succeed every promises otherwise returns false</p>
</dd>
<dt><a href="#some">some(promises)</a> ⇒ <code>Promise</code></dt>
<dd><p>This function returns true when succeed to promise at least one otherwise returns false</p>
</dd>
<dt><a href="#toSync">toSync(promise)</a> ⇒ <code>Promise</code></dt>
<dd><p>This function performs synchronously a promise</p>
</dd>
</dl>

<a name="once"></a>

## once([callback], [delayTime]) ⇒ <code>function</code>
This function calls callback function only once as the async after given delayTime(created timerId will be automatically dispose after performed it)

**Kind**: global function  
**Returns**: <code>function</code> - executor  

| Param | Type | Default |
| --- | --- | --- |
| [callback] | <code>function</code> | <code>function(){}</code> | 
| [delayTime] | <code>number</code> | <code>0</code> | 

**Example**  
```js
once(() => {}, 1000)();
```
<a name="delay"></a>

## delay([delayTime]) ⇒ <code>Promise</code>
This function will delay code execution for given delayTime

**Kind**: global function  

| Param | Type | Default |
| --- | --- | --- |
| [delayTime] | <code>number</code> | <code>0</code> | 

**Example**  
```js
delay(1000).then(() => {});
```
<a name="seq"></a>

## seq(promises) ⇒ <code>Promise</code>
This function returns an array which containing every results performed in order of a promises if haven't been rejected

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| promises | <code>Array</code> | An array which containing a promise or any value |

**Example**  
```js
seq([Promise.resolve(), Promise.resolve()]).then(values => {}).catch(value => {});
```
<a name="seqAll"></a>

## seqAll(promises) ⇒ <code>Promise</code>
This function returns an array which containing every results performed in order of a promises

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| promises | <code>Array</code> | An array which containing a promise or any value |

**Example**  
```js
seqAll([Promise.resolve(), Promise.resolve()]).then(values => {});
```
<a name="map"></a>

## map(promises, callback, context) ⇒ <code>Promise</code>
This function returns an array which containing every results performed in order of a promises if haven't been rejected

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| promises | <code>Array</code> | An array which containing a promise or any value |
| callback | <code>function</code> | A function which will be call on every promises |
| context | <code>\*</code> | A value which will be use as context(this) when performed callback function |

**Example**  
```js
map([Promise.resolve(), Promise.resolve()], (value) => value).then(values => {}).catch(value => {});
```
<a name="mapAll"></a>

## mapAll(promises, callback, context) ⇒ <code>Promise</code>
This function returns an array which containing every results performed in order of a promises

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| promises | <code>Array</code> | An array which containing a promise or any value |
| callback | <code>function</code> | A function which will be call on every promises |
| context | <code>\*</code> | A value which will be use as context(this) when performed callback function |

**Example**  
```js
mapAll([Promise.resolve(), Promise.resolve()], (value) => value).then(values => {});
```
<a name="race"></a>

## race(promises) ⇒ <code>Promise</code>
This function returns an array which containing every results in order a promise performed if haven't been rejected

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| promises | <code>Array</code> | An array which containing a promise or any value |

**Example**  
```js
race([Promise.resolve(), Promise.resolve()]).then(values => {}).catch(value => {});
```
<a name="raceAll"></a>

## raceAll(promises) ⇒ <code>Promise</code>
This function returns an array which containing every results in order a promise performed

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| promises | <code>Array</code> | An array which containing a promise or any value |

**Example**  
```js
raceAll([Promise.resolve(), Promise.resolve()]).then(values => {});
```
<a name="retry"></a>

## retry(callbacks, [retryCount], [delayTime]) ⇒ <code>Promise</code>
This function retry a callback function as much as given retryCount to until fulfilled each a promise if haven't been rejected

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| callbacks | <code>function</code> \| <code>Array</code> |  | A function or array which returns the promise or any value |
| [retryCount] | <code>number</code> | <code>0</code> |  |
| [delayTime] | <code>number</code> | <code>0</code> |  |

**Example**  
```js
retry([Promise.resolve(), Promise.resolve()], 3, 1000).then(values => {}).catch(value => {});
```
<a name="retryAll"></a>

## retryAll(callbacks, [retryCount], [delayTime]) ⇒ <code>Promise</code>
This function retry a callback function as much as given retryCount to until fulfilled each a promise

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| callbacks | <code>function</code> \| <code>Array</code> |  | A function or array which returns the promise or any value |
| [retryCount] | <code>number</code> | <code>0</code> |  |
| [delayTime] | <code>number</code> | <code>0</code> |  |

**Example**  
```js
retryAll([Promise.resolve(), Promise.resolve()], 3, 1000).then(values => {});
```
<a name="assert"></a>

## assert(callbacks, [retryCount], [delayTime]) ⇒ <code>Promise</code>
This function retry a callback function as much as given retryCount to until each callback function returns true if haven't been rejected

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| callbacks | <code>function</code> \| <code>Array</code> |  | A function or array which returns the boolean value |
| [retryCount] | <code>number</code> | <code>0</code> |  |
| [delayTime] | <code>number</code> | <code>0</code> |  |

**Example**  
```js
assert([Promise.resolve(), Promise.resolve()], 3, 1000).then(values => {}).catch(value => {});
```
<a name="assertAll"></a>

## assertAll(callbacks, [retryCount], [delayTime]) ⇒ <code>Promise</code>
This function retry a callback function as much as given retryCount to until each callback function returns true

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| callbacks | <code>function</code> \| <code>Array</code> |  | A function or array which returns the boolean value |
| [retryCount] | <code>number</code> | <code>0</code> |  |
| [delayTime] | <code>number</code> | <code>0</code> |  |

**Example**  
```js
assertAll([Promise.resolve(), Promise.resolve()], 3, 1000).then(values => {});
```
<a name="every"></a>

## every(promises) ⇒ <code>Promise</code>
This function returns true when succeed every promises otherwise returns false

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| promises | <code>Array</code> | An array which containing a promise or any value |

**Example**  
```js
every([Promise.resolve(), Promise.resolve()]).then(v => v);
```
<a name="some"></a>

## some(promises) ⇒ <code>Promise</code>
This function returns true when succeed to promise at least one otherwise returns false

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| promises | <code>Array</code> | An array which containing a promise or any value |

**Example**  
```js
some([Promise.resolve(), Promise.reject()]).then(v => v);
```
<a name="toSync"></a>

## toSync(promise) ⇒ <code>Promise</code>
This function performs synchronously a promise

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| promise | <code>Promise</code> | A promise which will be perform synchronously |

**Example**  
```js
toSync(Promise.resolve(1)).then(v => console.log(v));
```


