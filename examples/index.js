import { wait, seq, seqAll, map, mapAll, race, raceAll } from '../lib';

const p1 = new Promise(resolve => setTimeout(() => resolve(1), 2000));

// const p2 = Promise.resolve(2);
const p2 = Promise.reject(new Error('test'));

const p3 = Promise.resolve(3);
// const p3 = Promise.reject(new Error('test'));

wait(3000).then(() => {
  console.log('wait');

  seq([p1, p2, p3])
    .then(v => {
      console.log(v);
    })
    // .then((v) => {
    //   console.log(v);
    // })
    .catch(e => {
      console.dir(e);
    })
    .finally(() => {
      console.log('finally 1');
    })
    .finally(() => {
      console.log('finally 2');
    });

  seqAll([p1, p2, p3])
    .then(v => {
      console.log(v);
    })
    .finally(() => {
      console.log('finally 1');
    })
    .finally(() => {
      console.log('finally 2');
    });

  map([p1, p2, p3], ({ value }) => `TEST_${value}`)
    .then(values => {
      console.log(values);
    })
    // .then((v) => {
    //   console.log(v);
    // })
    .catch(e => {
      console.dir(e);
    })
    .finally(() => {
      console.log('finally 1');
    })
    .finally(() => {
      console.log('finally 2');
    });

  mapAll([p1, p2, p3], ({ status, value }) => {
    if (status !== 'rejected') {
      return `TEST_${value}`;
    }
  })
    .then(values => {
      console.log(values);
    })
    .finally(() => {
      console.log('finally 1');
    })
    .finally(() => {
      console.log('finally 2');
    });

  race([p1, p2, p3])
    .then(values => {
      console.log(values);
    })
    // .then((v) => {
    //   console.log(v);
    // })
    .catch(e => {
      console.dir(e);
    })
    .finally(() => {
      console.log('finally 1');
    })
    .finally(() => {
      console.log('finally 2');
    });

  raceAll([p1, p2, p3])
    .then(values => {
      console.log(values);
    })
    .finally(() => {
      console.log('finally 1');
    })
    .finally(() => {
      console.log('finally 2');
    });
});
