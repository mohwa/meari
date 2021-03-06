import {
  once,
  delay,
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
  every,
  some,
  toSync,
} from '../lib';

// let p1, p2, p3;

// p1 = Promise.resolve(1);
// p2 = Promise.resolve(2);
// p3 = Promise.resolve(3);
//
// seq([p1, p2, p3])
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
//   .catch(v => {
//     console.log(v);
//   })
//   .finally(() => {
//     console.log('finally');
//   });

// p1 = Promise.resolve(1);
// p2 = Promise.reject(new Error());
// p3 = Promise.resolve(3);
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
//           at Object.<anonymous> (/Users/user/htdocs/mohwa/async-trainer/examples/index.js:27:27)
//           ...
//         index: 1
//       },
//       { status: 'fulfilled', value: 3, index: 2 }
//     ]
//      */
//   })
//   .finally(() => {
//     console.log('finally');
//   });

// p1 = Promise.resolve(1);
// p2 = Promise.resolve(2);
// p3 = Promise.resolve(3);
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

// p1 = Promise.resolve(1);
// p2 = Promise.reject(new Error());
// p3 = Promise.resolve(3);
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
//
// p1 = Promise.resolve(1);
// p2 = Promise.resolve(2);
// p3 = Promise.resolve(3);
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
//
// p1 = Promise.resolve(1);
// p2 = Promise.reject(new Error());
// p3 = Promise.resolve(3);
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
//
// p1 = () => Promise.resolve(1);
// p2 = () => Promise.resolve(2);
// p3 = () => Promise.resolve(3);
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
//
// p1 = () => Promise.resolve(1);
// p2 = () => Promise.reject(new Error());
// p3 = () => Promise.resolve(3);
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
//
// let cb1, cb2, cb3;
//
// cb1 = () => true;
// cb2 = () => true;
// cb3 = () => true;
//
// assert([cb1, cb2, cb3], 3, 1000)
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
//
// cb1 = () => true;
// cb2 = () => false;
// cb3 = () => true;
//
// assertAll([cb1, cb2, cb3], 3, 1000)
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

// var p1 = 1;
// var p2 = Promise.resolve(2);
// var p3 = Promise.resolve(3);
// //
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
//
// var p1 = Promise.resolve(1);
// var p2 = Promise.reject(new Error());
// var p3 = () => 3;
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
//
// var p1 = Promise.resolve(1);
// var p2 = 33;
// var p3 = Promise.resolve(3);
// //
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
// //
// var p1 = Promise.resolve(1);
// var p2 = Promise.reject(new Error());
// var p3 = [1, 2, 3];
//
// mapAll([p1, p2, p3], ({ status, value }) => {
//   if (status !== 'rejected') {
//     return `TEST_${value[0]},${value[1]},${value[2]}`;
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
// //
// var p1 = () => new Promise((resolve) => setTimeout(() => resolve(1), 4000));
// var p2 = 2766;
// var p3 = Promise.resolve(3);
//
// race([p1(), p2, p3])
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
// //
// var p1 = Promise.resolve(1);
// var p2 = Promise.reject(new Error());
// var p3 = Promise.resolve(3);
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
//
// var p1 = () => Promise.resolve(1);
// var p2 = () => Promise.resolve(2);
// var p3 = () => Promise.resolve(3);
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
// //
// var p1 = () => Promise.resolve(1);
// var p2 = () => Promise.reject(new Error());
// var p3 = () => Promise.resolve(3);
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

// var c1 = () => true;
// var c2 = () => 22;
// var c3 = () => true;
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
//
// var c1 = () => true;
// var c2 = () => false;
// var c3 = () => true;
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
//
// once(() => { console.log('once'); }, 1000)(); // once
//
// delay(1000).then(() => { console.log('start'); }); // start
//
// let p1, p2, p3;
//
// p1 = Promise.resolve(1);
// p2 = Promise.resolve(2);
// p3 = Promise.resolve(3);
//
// every([p1, p2, p3]).then(v => {
//   console.log(v); // true
// });
//
// p1 = Promise.reject(1);
// p2 = Promise.reject(2);
// p3 = Promise.resolve(3);
//
// some([p1, p2, p3]).then(v => {
//   console.log(v); // true
// });
//
// p1 = () => {
//   return new Promise((resolve) => {
//     setTimeout(() => resolve(1), 300);
//   });
// };
//
// p2 = () => {
//   return new Promise((resolve) => {
//     setTimeout(() => resolve(2), 100);
//   });
// };
//
// toSync(p1()).then(v => console.log(v));
// toSync(p2()).then(v => console.log(v));
//
// // 1
// // 2
