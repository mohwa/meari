import { once, delay, seq, seqAll, map, mapAll, race, raceAll, retry, retryAll, assert, assertAll } from '../lib';

// delay(3000).then(() => {
// const p1 = Promise.resolve(1);
// const p2 = Promise.resolve(2);
// const p3 = Promise.resolve(3);
//
// seq([p1, p2, p3])
// .then(values => {
//   console.log(values);
//   /*
//   [
//     { status: 'fulfilled', value: 1, index: 0 },
//     { status: 'fulfilled', value: 2, index: 1 },
//     { status: 'fulfilled', value: 3, index: 2 }
//   ]
//    */
// })
// .catch(v => {
//   console.log(v);
// })
// .finally(() => {
//   console.log('finally');
// });

// const p1 = Promise.resolve(1);
// const p2 = Promise.reject(new Error());
// const p3 = Promise.resolve(3);
//
// seqAll([p1, p2, p3])
//   .then(values => {
//     console.log(values);
//     /*
//     [
//       { status: 'fulfilled', value: 1, index: 0 },
//       {
//         status: 'rejected',
//         value: Error:
//             at Object.<anonymous> (/Users/user/htdocs/mohwa/async-trainer/examples/index.js:27:27)
//             ...
//         index: 1
//       },
//       { status: 'fulfilled', value: 3, index: 2 }
//     ]
//      */
//   })
//   .finally(() => {
//     console.log('finally');
//   });

// const p1 = Promise.resolve(1);
// const p2 = Promise.resolve(2);
// const p3 = Promise.resolve(3);
//
// map([p1, p2, p3], ({ value }) => `TEST_${value}`)
//   .then(values => {
//     console.log(values); // [ 'TEST_1', 'TEST_2', 'TEST_3' ]
//   })
//   .catch(e => {
//     console.dir(e);
//   })
//   .finally(() => {
//     console.log('finally');
//   });

// const p1 = Promise.resolve(1);
// const p2 = Promise.reject(new Error());
// const p3 = Promise.resolve(3);
//
// mapAll([p1, p2, p3], ({ status, value }) => {
//   if (status !== 'rejected') {
//     return `TEST_${value}`;
//   } else {
//     return value;
//   }
// })
//   .then(values => {
//     console.log(values);
//     /*
//       [
//         'TEST_1',
//         Error:
//             at Object.<anonymous> (/Users/user/htdocs/mohwa/async-trainer/examples/index.js:68:27)
//             ...
//         'TEST_3'
//       ]
//      */
//   })
//   .finally(() => {
//     console.log('finally');
//   });

// const p1 = Promise.resolve(1);
// const p2 = Promise.resolve(2);
// const p3 = Promise.resolve(3);
//
// race([p1, p2, p3])
//   .then(values => {
//     console.log(values);
//     /*
//     [
//       { status: 'fulfilled', value: 1, index: 0 },
//       { status: 'fulfilled', value: 2, index: 1 },
//       { status: 'fulfilled', value: 3, index: 2 }
//     ]
//      */
//   })
//   .catch(e => {
//     console.dir(e);
//   })
//   .finally(() => {
//     console.log('finally');
//   });

// const p1 = Promise.resolve(1);
// const p2 = Promise.reject(new Error());
// const p3 = Promise.resolve(3);
//
// raceAll([p1, p2, p3])
//   .then(values => {
//     console.log(values);
//     /*
//     [
//       { status: 'fulfilled', value: 1, index: 0 },
//       { status: 'fulfilled', value: 3, index: 2 },
//       {
//         status: 'rejected',
//         value: Error:
//             at Object.<anonymous> (/Users/user/htdocs/mohwa/async-trainer/examples/index.js:117:27)
//             ...
//         index: 1
//       }
//     ]
//      */
//   })
//   .finally(() => {
//     console.log('finally 1');
//   });

// const p1 = () => Promise.resolve(1);
// const p2 = () => Promise.resolve(2);
// const p3 = () => Promise.resolve(3);
//
// retry([p1, p2, p3], 3, 1000)
//   .then(values => {
//     console.log(values);
//     /*
//     [
//       { status: 'fulfilled', value: 1, index: 0 },
//       { status: 'fulfilled', value: 2, index: 1 },
//       { status: 'fulfilled', value: 3, index: 2 }
//     ]
//      */
//   })
//   .catch(value => {
//     console.log(value);
//   });

// const p1 = () => Promise.resolve(1);
// const p2 = () => Promise.reject(new Error());
// const p3 = () => Promise.resolve(3);
//
// retryAll([p1, p2, p3], 3, 1000).then(values => {
//   console.log(values);
//   /*
//   [
//     { status: 'fulfilled', value: 1, index: 0 },
//     {
//       status: 'rejected',
//       value: Error:
//           at callback (/Users/user/htdocs/mohwa/async-trainer/examples/index.js:161:33)
//           ...
//       index: 1
//     },
//     { status: 'fulfilled', value: 3, index: 2 }
//   ]
//    */
// });
// const c1 = () => true;
// const c2 = () => true;
// const c3 = () => true;
//
// assert([c1, c2, c3], 3, 1000)
//   .then(values => {
//     console.log(values);
//     /*
//     [
//       { status: 'truly', value: true, index: 0 },
//       { status: 'truly', value: true, index: 1 },
//       { status: 'truly', value: true, index: 2 }
//     ]
//      */
//   })
//   .catch(value => {
//     console.log(value);
//   });

// const c1 = () => true;
// const c2 = () => false;
// const c3 = () => true;
//
// assertAll([c1, c2, c3], 3, 1000)
//   .then(values => {
//     console.log(values);
//     /*
//     [
//       { status: 'truly', value: true, index: 0 },
//       { status: 'falsely', value: false, index: 1 },
//       { status: 'truly', value: true, index: 2 }
//     ]
//      */
//   });

once(() => {
  console.log('once');
}, 1000)(); // once

delay(1000).then(() => {
  console.log('start');
}); // start
// });
