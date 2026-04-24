/*
    Promise.any() takes an iterable of elements (usually Promises). 
    It returns a single promise that resolves as soon as any of the elements in the iterable fulfills,
    with the value of the fulfilled promise. 
    If no promises in the iterable fulfill (if all of the given elements are rejected),
    then the returned promise is rejected with an AggregateError, a new subclass of Error that groups together individual errors.

    If an empty iterable is passed, then the promise returned by this method is rejected synchronously. The rejected reason is an AggregateError object whose errors property is an empty array.
*/

function promiseAny(promises) {
    return new Promise((resolve, reject) => {
      if (promises.length === 0) {
        reject(new AggregateError([]));
      }
      let errors = [];
      let pending = promises.length;
      promises.map(async (promise, idx) => {
        try {
          const val = await promise;
          resolve(val);
        } catch (error) {
          errors[idx] = error;
          pending--;
  
          if (pending === 0) {
            reject(new AggregateError(error));
          }
        }
      });
    });
  }
  
  const p0 = Promise.resolve(42);
  const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(21);
    }, 100);
  });
  
  promiseAny([p0, p1]).then(console.log);
  