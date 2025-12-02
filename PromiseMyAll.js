
const promise1 = new Promise((resolve)=>{
    setTimeout(()=>{
        resolve('1');
    },100);
})
const promise2 =  4
const promise3 = new Promise((resolve)=>{
    setTimeout(()=>{
        resolve('3');
    },200);
})
const promises = [promise1,promise2,promise3]

Promise.all(promises).then(console.log)

Promise.myAll = function(promises){
    return new Promise((resolve,reject)=>{
        if(!Array.isArray(promises)){
            return reject('Argument type should be an array')
        }
        let results = [];
        let completed = 0;
        promises.forEach((promise,index)=>{
            Promise.resolve(promise).then((val)=>{
                results[index] = val; //keep index to maintain the order in results as per promises array
                completed++;

                if(completed === results.length){
                    resolve(results);
                }
            }).catch(err=>reject(err));
        })
    })
}
Promise.myAll(promises).then(console.log)