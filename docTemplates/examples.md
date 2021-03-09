### Functions

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

### once([callback], [delayTime]) ⇒ <code>function</code>
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

### delay([delayTime]) ⇒ <code>Promise</code>
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

### seq(promises) ⇒ <code>Promise</code>
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

### seqAll(promises) ⇒ <code>Promise</code>
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

### map(promises, callback, context) ⇒ <code>Promise</code>
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

### mapAll(promises, callback, context) ⇒ <code>Promise</code>
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

### race(promises) ⇒ <code>Promise</code>
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

### raceAll(promises) ⇒ <code>Promise</code>
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

### retry(callbacks, [retryCount], [delayTime]) ⇒ <code>Promise</code>
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

### retryAll(callbacks, [retryCount], [delayTime]) ⇒ <code>Promise</code>
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

### assert(callbacks, [retryCount], [delayTime]) ⇒ <code>Promise</code>
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

### assertAll(callbacks, [retryCount], [delayTime]) ⇒ <code>Promise</code>
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

### every(promises) ⇒ <code>Promise</code>
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

### some(promises) ⇒ <code>Promise</code>
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

### toSync(promise) ⇒ <code>Promise</code>
This function performs synchronously a promise

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| promise | <code>Promise</code> | A promise which will be perform synchronously |

**Example**  
```js
toSync(Promise.resolve(1)).then(v => console.log(v));
```
