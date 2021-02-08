import { bindToFunction } from './_utils';

const STATUS = {
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected',
};

function _indexOf(v, target) {
  return v.indexOf(target);
}

function _seq(promises) {
  const stacks = [];
  const values = [];
  const errors = [];

  const _finally = resolve => {
    stacks.shift();

    if (stacks.length) {
      next(stacks[0]);
    } else {
      resolve(values);
    }
  };

  const next = ({ promise, resolve, reject }) => {
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
      .catch(error => {
        errors.push({
          status: STATUS.REJECTED,
          error,
          index,
          promise,
        });
      })
      .finally(() => {
        if (errors.length) {
          const error = errors.shift();

          reject({
            error,
            index,
            promise,
          });
        } else {
          _finally(resolve);
        }
      });
  };

  return new Promise((resolve, reject) => {
    promises.forEach(promise => {
      stacks.push({ promise, resolve, reject });
    });

    if (stacks.length) {
      next(stacks[0]);
    }
  });
}

function _seqAll(promises) {
  const stacks = [];
  const results = [];

  const _finally = resolve => {
    stacks.shift();

    if (stacks.length) {
      next(stacks[0]);
    } else {
      resolve(results);
    }
  };

  const next = ({ promise, resolve }) => {
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
      .catch(error => {
        results.push({
          status: STATUS.REJECTED,
          error,
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
      stacks.push({ promise, resolve });
    });

    if (stacks.length) {
      next(stacks[0]);
    }
  });
}

function _race(promises) {
  const values = [];
  const errors = [];

  const _finally = resolve => {
    if (promises.length === values.length) {
      resolve(values);
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
      .catch(error => {
        errors.push({
          status: STATUS.REJECTED,
          error,
          index,
          promise,
        });
      })
      .finally(() => {
        if (errors.length) {
          const error = errors.shift();

          reject({
            error,
            index,
            promise,
          });
        } else {
          _finally(resolve);
        }
      });
  };

  return new Promise((resolve, reject) => {
    promises.forEach(promise => {
      exec({ promise, resolve, reject });
    });
  });
}

function _raceAll(promises = []) {
  const results = [];

  const _finally = resolve => {
    if (promises.length === results.length) {
      resolve(results);
    }
  };

  const exec = (promise, resolve) => {
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
      .catch(error => {
        results.push({
          status: STATUS.REJECTED,
          error,
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
      exec(promise, resolve);
    });
  });
}

/**
 *
 * @param waitTime
 * @returns {Promise<unknown>}
 */
export function wait(waitTime) {
  return new Promise(resolve => {
    const timerId = setTimeout(() => {
      resolve();
      clearTimeout(timerId);
    }, waitTime);
  });
}

/**
 *
 * @param promises
 * @returns {Promise<unknown>}
 */
export function seq(promises) {
  return new Promise((resolve, reject) => {
    _seq(promises)
      .then(values => {
        resolve(values);
      })
      .catch(e => {
        reject(e);
      });
  });
}

/**
 *
 * @param promises
 * @returns {Promise<unknown>}
 */
export function seqAll(promises) {
  return new Promise(resolve => {
    _seqAll(promises).then(values => {
      resolve(values);
    });
  });
}

/**
 *
 * @param promises
 * @param callback
 * @param context
 * @returns {Promise<unknown>}
 */
export function map(promises, callback, context) {
  const _callback = bindToFunction(callback, context, v => v);

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
      .catch(e => {
        reject(e);
      });
  });
}

/**
 *
 * @param promises
 * @param callback
 * @param context
 * @returns {Promise<unknown>}
 */
export function mapAll(promises, callback, context) {
  const _callback = bindToFunction(callback, context, v => v);

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
 *
 * @param promises
 * @returns {Promise<unknown>}
 */
export function race(promises) {
  return new Promise((resolve, reject) => {
    _race(promises)
      .then(values => {
        resolve(values);
      })
      .catch(e => {
        reject(e);
      });
  });
}

/**
 *
 * @param promises
 * @returns {Promise<unknown>}
 */
export function raceAll(promises) {
  return new Promise(resolve => {
    _raceAll(promises).then(values => {
      resolve(values);
    });
  });
}
