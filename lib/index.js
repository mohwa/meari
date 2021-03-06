import { type } from 'emnida';
import { bindToFunction } from './_utils';

const { isArray, isFunction, isObject } = type;

const STATUS = {
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected',
  TRULY: 'truly',
  FALSELY: 'falsely',
};

const KEY = {
  PROMISE: 'promise',
  CALLBACK: 'callback',
};

function isPromise(v) {
  return isObject(v) && isFunction(v.then) && isFunction(v.catch);
}

function toPromise(v) {
  if (!isPromise(v)) {
    return Promise.resolve(v);
  }
  return v;
}

function _indexOf(arr, v) {
  return arr.indexOf(v);
}

function removeSomePropertyBy(key, arr) {
  return arr.map(v => {
    return Object.keys(v).reduce((acc, k) => {
      if (k !== key) acc[k] = v[k];
      return acc;
    }, {});
  });
}

function resetItemsBy(key, targets, values) {
  const newValues = targets.map(v => {
    return values.find(vv => v === vv[key]);
  });

  return removeSomePropertyBy(key, newValues);
}

function copyCallbackList(callbacks, defaultCallback) {
  const _callback = isArray(callbacks) ? callbacks : [callbacks];

  return _callback.map(v => {
    if (isFunction(v)) {
      return v.bind(null);
    }
    return defaultCallback;
  });
}

function _seq(promises = []) {
  promises = promises.map(v => toPromise(v));
  const values = [];

  const _finally = resolve => {
    if (promises.length === values.length) {
      resolve(resetItemsBy(KEY.PROMISE, promises, values));
    }
  };

  const exec = ({ promise, resolve, reject }) => {
    const index = _indexOf(promises, promise);

    promise
      .then(value => {
        values.push({
          status: STATUS.FULFILLED,
          value,
          index,
          promise,
        });
      })
      .catch(value => {
        reject({
          status: STATUS.REJECTED,
          value,
          index,
        });
      })
      .finally(() => {
        _finally(resolve);
      });
  };

  return new Promise((resolve, reject) => {
    promises.forEach(promise => {
      exec({ promise, resolve, reject });
    });
  });
}

function _seqAll(promises = []) {
  promises = promises.map(v => toPromise(v));
  const results = [];

  const _finally = resolve => {
    if (promises.length === results.length) {
      resolve(resetItemsBy(KEY.PROMISE, promises, results));
    }
  };

  const exec = ({ promise, resolve }) => {
    const index = _indexOf(promises, promise);

    promise
      .then(value => {
        results.push({
          status: STATUS.FULFILLED,
          value,
          index,
          promise,
        });
      })
      .catch(value => {
        results.push({
          status: STATUS.REJECTED,
          value,
          index,
          promise,
        });
      })
      .finally(() => {
        _finally(resolve);
      });
  };

  return new Promise(resolve => {
    promises.forEach(promise => {
      exec({ promise, resolve });
    });
  });
}

function _race(promises = []) {
  promises = promises.map(v => toPromise(v));
  const values = [];

  const _finally = resolve => {
    if (promises.length === values.length) {
      resolve(removeSomePropertyBy(KEY.PROMISE, values));
    }
  };

  const exec = ({ promise, resolve, reject }) => {
    const index = _indexOf(promises, promise);

    promise
      .then(value => {
        values.push({
          status: STATUS.FULFILLED,
          value,
          index,
          promise,
        });
      })
      .catch(value => {
        reject({
          status: STATUS.REJECTED,
          value,
          index,
        });
      })
      .finally(() => {
        _finally(resolve);
      });
  };

  return new Promise((resolve, reject) => {
    promises.forEach(promise => {
      exec({ promise, resolve, reject });
    });
  });
}

function _raceAll(promises = []) {
  promises = promises.map(v => toPromise(v));
  const results = [];

  const _finally = resolve => {
    if (promises.length === results.length) {
      resolve(removeSomePropertyBy(KEY.PROMISE, results));
    }
  };

  const exec = ({ promise, resolve }) => {
    const index = _indexOf(promises, promise);

    promise
      .then(value => {
        results.push({
          status: STATUS.FULFILLED,
          value,
          index,
          promise,
        });
      })
      .catch(value => {
        results.push({
          status: STATUS.REJECTED,
          value,
          index,
          promise,
        });
      })
      .finally(() => {
        _finally(resolve);
      });
  };

  return new Promise(resolve => {
    promises.forEach(promise => {
      exec({ promise, resolve });
    });
  });
}

function _retry(callbacks, delayTime = 0, retryCount = 0) {
  const _callbacks = copyCallbackList(callbacks, () => Promise.reject());
  const values = [];

  const _finally = resolve => {
    if (_callbacks.length === values.length) {
      resolve(resetItemsBy(KEY.CALLBACK, _callbacks, values));
    }
  };

  const exec = stack => {
    const { callback, resolve, reject } = stack;
    const index = _indexOf(_callbacks, callback);
    const promise = toPromise(callback());

    promise
      .then(value => {
        values.push({
          status: STATUS.FULFILLED,
          value,
          index,
          callback,
        });
      })
      .catch(value => {
        if (--stack.retryCount >= 0) {
          once(() => exec(stack), delayTime)();
        } else {
          reject({
            status: STATUS.REJECTED,
            value,
            index,
          });
        }
      })
      .finally(() => {
        _finally(resolve);
      });
  };

  return new Promise((resolve, reject) => {
    _callbacks.forEach(callback => {
      exec({
        callback,
        resolve,
        reject,
        retryCount,
      });
    });
  });
}

function _retryAll(callbacks, delayTime = 0, retryCount = 0) {
  const _callbacks = copyCallbackList(callbacks, () => Promise.reject());
  const results = [];

  const _finally = resolve => {
    if (_callbacks.length === results.length) {
      resolve(resetItemsBy(KEY.CALLBACK, _callbacks, results));
    }
  };

  const exec = stack => {
    const { callback, resolve } = stack;
    const index = _indexOf(_callbacks, callback);
    const promise = toPromise(callback());

    promise
      .then(value => {
        results.push({
          status: STATUS.FULFILLED,
          value,
          index,
          callback,
        });
      })
      .catch(value => {
        if (--stack.retryCount >= 0) {
          once(() => exec(stack), delayTime)();
        } else {
          results.push({
            status: STATUS.REJECTED,
            value,
            index,
            callback,
          });
        }
      })
      .finally(() => {
        _finally(resolve);
      });
  };

  return new Promise(resolve => {
    _callbacks.forEach(callback => {
      exec({
        callback,
        resolve,
        retryCount,
      });
    });
  });
}

function _assert(callbacks, delayTime = 0, retryCount = 0) {
  const _callbacks = copyCallbackList(callbacks, () => false);
  const values = [];

  const _finally = resolve => {
    if (_callbacks.length === values.length) {
      resolve(resetItemsBy(KEY.CALLBACK, _callbacks, values));
    }
  };

  const exec = stack => {
    const { callback, resolve, reject } = stack;
    const index = _indexOf(_callbacks, callback);
    const value = callback();

    if (value === true) {
      values.push({
        status: STATUS.TRULY,
        value,
        index,
        callback,
      });
    } else {
      if (--stack.retryCount >= 0) {
        once(() => exec(stack), delayTime)();
      } else {
        reject({
          status: STATUS.FALSELY,
          value,
          index,
        });
      }
    }
    _finally(resolve);
  };

  return new Promise((resolve, reject) => {
    _callbacks.forEach(callback => {
      exec({
        callback,
        resolve,
        reject,
        retryCount,
      });
    });
  });
}

function _assertAll(callbacks, delayTime = 0, retryCount = 0) {
  const _callbacks = copyCallbackList(callbacks, () => false);
  const results = [];

  const _finally = resolve => {
    if (_callbacks.length === results.length) {
      resolve(resetItemsBy(KEY.CALLBACK, _callbacks, results));
    }
  };

  const exec = stack => {
    const { callback, resolve } = stack;
    const index = _indexOf(_callbacks, callback);
    const value = callback();

    if (value === true) {
      results.push({
        status: STATUS.TRULY,
        value,
        index,
        callback,
      });
    } else {
      if (--stack.retryCount >= 0) {
        once(() => exec(stack), delayTime)();
      } else {
        results.push({
          status: STATUS.FALSELY,
          value,
          index,
          callback,
        });
      }
    }
    _finally(resolve);
  };

  return new Promise(resolve => {
    _callbacks.forEach(callback => {
      exec({
        callback,
        resolve,
        retryCount,
      });
    });
  });
}

/**
 * This function calls callback function only once as the async after given delayTime
 * @param {function} [callback=function(){}]
 * @param {number} [delayTime=0]
 * @returns {function}
 * @example
 * once(() => {}, 1000)();
 */
export function once(callback = () => {}, delayTime = 0) {
  let timerId = null;

  const clear = () => {
    clearTimeout(timerId);
    timerId = null;
  };

  return (...args) => {
    clear();

    const _callback = () => {
      clear();
      callback.apply(null, args);
    };
    timerId = setTimeout(_callback, delayTime);
  };
}

/**
 * This function will delay codes execution for given delayTime
 * @param {number} [delayTime=0]
 * @returns {Promise}
 * @example
 * delay(1000).then(() => {});
 */
export function delay(delayTime = 0) {
  return new Promise(resolve => {
    once(() => {
      resolve();
    }, delayTime)();
  });
}

/**
 * This function returns an array which containing every results performed in order of an elements of the promise
 * @param {Array} promises An array which containing the promises
 * @returns {Promise}
 * @example
 * seq([Promise.resolve(), Promise.resolve()]).then(values => {}).catch(value => {});
 */
export function seq(promises) {
  return new Promise((resolve, reject) => {
    _seq(promises)
      .then(v => resolve(v))
      .catch(v => reject(v));
  });
}

/**
 * This function returns an array which containing every results performed in order of an elements of the promise
 * @param {Array} promises An array which containing the promises
 * @returns {Promise}
 * @example
 * seqAll([Promise.resolve(), Promise.resolve()]).then(values => {});
 */
export function seqAll(promises) {
  return new Promise(resolve => {
    _seqAll(promises).then(v => resolve(v));
  });
}

/**
 * This function returns an array which containing every results performed in order of an elements of the promise
 * @param {Array} promises An array which containing the promises
 * @param {function} callback A function which will be call on every element of a promises
 * @param {*} context A value which will be use as context(this) when executed callback function
 * @returns {Promise}
 * @example
 * map([Promise.resolve(), Promise.resolve()], value => value).then(values => {}).catch(value => {});
 */
export function map(promises, callback, context) {
  const _callback = bindToFunction(callback, context);

  return new Promise((resolve, reject) => {
    _seq(promises)
      .then(values => {
        resolve(
          values.reduce((acc, v) => {
            acc.push(_callback(v));

            return acc;
          }, [])
        );
      })
      .catch(v => reject(v));
  });
}

/**
 * This function returns an array which containing every results performed in order of an elements of the promise
 * @param {Array} promises An array which containing the promises
 * @param {function} callback A function which will be call on every element of a promises
 * @param {*} context A value which will be use as context(this) when executed callback function
 * @returns {Promise}
 * @example
 * mapAll([Promise.resolve(), Promise.resolve()], value => value).then(values => {});
 */
export function mapAll(promises, callback, context) {
  const _callback = bindToFunction(callback, context);

  return new Promise(resolve => {
    _seqAll(promises).then(values => {
      resolve(
        values.reduce((acc, v) => {
          acc.push(_callback(v));

          return acc;
        }, [])
      );
    });
  });
}

/**
 * This function returns an array which containing every results in order the promise performed
 * @param {Array} promises An array which containing the promises
 * @returns {Promise}
 * @example
 * race([Promise.resolve(), Promise.resolve()]).then(values => {}).catch(value => {});
 */
export function race(promises) {
  return new Promise((resolve, reject) => {
    _race(promises)
      .then(v => resolve(v))
      .catch(v => reject(v));
  });
}

/**
 * This function returns an array which containing every results in order the promise performed
 * @param {Array} promises An array which containing the promises
 * @returns {Promise}
 * @example
 * raceAll([Promise.resolve(), Promise.resolve()]).then(values => {});
 */
export function raceAll(promises) {
  return new Promise(resolve => {
    _raceAll(promises).then(v => resolve(v));
  });
}

/**
 * This function retry the callback function as much as given retryCount to until fulfilled the promise
 * @param {function|Array} callbacks A function or array which returns the promise
 * @param {number} [retryCount=0]
 * @param {number} [delayTime=0]
 * @returns {Promise}
 * @example
 * retry([Promise.resolve(), Promise.resolve()], 3, 1000).then(values => {}).catch(value => {});
 */
export function retry(callbacks, retryCount = 0, delayTime = 0) {
  return new Promise((resolve, reject) => {
    _retry(callbacks, delayTime, retryCount)
      .then(v => resolve(v))
      .catch(v => reject(v));
  });
}

/**
 * This function retry the callback function as much as given retryCount to until fulfilled the promise
 * @param {function|Array} callbacks A function or array which returns the promise
 * @param {number} [retryCount=0]
 * @param {number} [delayTime=0]
 * @returns {Promise}
 * @example
 * retryAll([Promise.resolve(), Promise.resolve()], 3, 1000).then(values => {});
 */
export function retryAll(callbacks, retryCount = 0, delayTime = 0) {
  return new Promise(resolve => {
    _retryAll(callbacks, delayTime, retryCount).then(v => resolve(v));
  });
}

/**
 * This function retry the callback function as much as given retryCount to until returns true the callback function
 * @param {function|Array} callbacks A function or array which returns the boolean value
 * @param {number} [retryCount=0]
 * @param {number} [delayTime=0]
 * @returns {Promise}
 * @example
 * assert([Promise.resolve(), Promise.resolve()], 3, 1000).then(values => {}).catch(value => {});
 */
export function assert(callbacks, retryCount = 0, delayTime = 0) {
  return new Promise((resolve, reject) => {
    _assert(callbacks, delayTime, retryCount)
      .then(v => resolve(v))
      .catch(v => reject(v));
  });
}

/**
 * This function retry the callback function as much as given retryCount to until returns true the callback function
 * @param {function|Array} callbacks A function or array which returns the boolean value
 * @param {number} [retryCount=0]
 * @param {number} [delayTime=0]
 * @returns {Promise}
 * @example
 * assertAll([Promise.resolve(), Promise.resolve()], 3, 1000).then(values => {});
 */
export function assertAll(callbacks, retryCount = 0, delayTime = 0) {
  return new Promise(resolve => {
    _assertAll(callbacks, delayTime, retryCount).then(v => resolve(v));
  });
}

/**
 * This function returns a true when succeed every promises otherwise returns false
 * @param {Array} promises An array which containing the promises
 * @returns {Promise}
 * @example
 * every([Promise.resolve(), Promise.resolve()]).then(v => v);
 */
export function every(promises) {
  return new Promise(resolve => {
    _seq(promises)
      .then(() => resolve(true))
      .catch(() => resolve(false));
  });
}

/**
 * This function returns a true when succeed to some promises otherwise returns false
 * @param {Array} promises An array which containing the promises
 * @returns {Promise}
 * @example
 * some([Promise.resolve(), Promise.reject()]).then(v => v);
 */
export function some(promises) {
  return new Promise(resolve => {
    _seqAll(promises).then(values => {
      const result = values.some(v => v.status === STATUS.FULFILLED);

      resolve(result);
    });
  });
}

/**
 * This function execution synchronously every promises
 * @param {Promise} A promise which will be execution synchronously
 * @returns {Promise}
 * @example
 * toSync(Promise.resolve(1)).then(v => console.log(v));
 */
export const toSync = (() => {
  const stacks = [];

  return promise => {
    return new Promise((resolve, reject) => {
      const stack = { promise, resolve, reject };

      if (stacks.length) {
        stacks.push(stack);
        return;
      }

      stacks.push(stack);

      const next = ({ promise, resolve }) => {
        promise.then(v => {
          resolve(v);
          stacks.shift();

          if (stacks.length) {
            next(stacks[0]);
          }
        });
      };
      next(stack);
    });
  };
})();
