/*

    The Promise.race() method returns a promise that fulfills or rejects as soon as one of the promises 
    in an iterable fulfills or rejects, with the value or reason from that promise.

    If the iterable passed is empty, the promise returned will be forever pending.

    If the iterable contains one or more non-promise value and/or an already settled promise,
    then Promise.race() will resolve to the first of these values found in the iterable.
*/

Promise.myRace = function (promises) {
    return new Promise((resolve, reject) => {
      promises.forEach(async (promise, idx) => {
        try {
          const result = await promise;
          resolve(result);
        } catch (error) {
          await reject(error);
        }
      });
    });
  };
  
  const promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("1");
    }, 100);
  });
  const promise3 = new Promise((resolve) => {
    setTimeout(() => {
      resolve("3");
    }, 200);
  });
  const promises = [promise1, promise3];
  
  Promise.myRace(promises)
    .then((val) => console.log(val))
    .catch((err) => console.log(err));
  
  Promise.race(promises)
    .then((val) => console.log(val))
    .catch((err) => console.log(err));