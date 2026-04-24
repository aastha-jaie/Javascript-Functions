/*
    The Promise.allSettled() :method returns a promise that resolves after all of the given promises have either
    fulfilled or rejected, with an array of objects that each describes the outcome of each promise.

    However, if and only if an empty iterable is passed as an argument, Promise.allSettled() returns a Promise object that has already been resolved as an empty array

    For each outcome object, a status string is present. If the status is 'fulfilled', then a value is present. If the status is 'rejected', then a reason is present. 
    The value (or reason) reflects what value each promise was fulfilled (or rejected) with.
*/

Promise.myAllSettled = function(promises){
    return new Promise((resolve, reject)=>{
        if(promises.length === 0){
            resolve([]);
        }
        const result = new Array(promises.length);
        let pending = promises.length;

        promises.map(async(promise, idx) =>{
            try{
                const val = await promise;
                result[idx] = {status: 'fulfilled', value : val}
            }
            catch(error){
                result[idx] = {status:'rejected', reason: error}
            }
            pending--;
            if(pending === 0){
                resolve(result);
            }
        })
    })
}

const p0 = Promise.resolve(42);
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(21);
  }, 100);
});

Promise.myAllSettled([p0, p1]).then((val) => console.log(val));