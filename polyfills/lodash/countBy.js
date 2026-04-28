/*
    Implement countBy(array, iteratee) so it creates an object whose keys are the results of calling iteratee on each element of array. 
    The value of each key is the number of elements that produced that result. Do not modify the original array.
*/

function countBy(array, iteratee) {
    let resultObj = {};
    for (let i = 0; i < array.length; i++) {
      const key = iteratee(array[i]); //6
      if (key in resultObj) {
        console.log("key", key);
        const val = resultObj[key];
        resultObj[key] = val + 1;
      } else {
        resultObj[key] = 1;
      }
    }
    return resultObj;
  }
  
  const res = countBy([6.1, 4.2, 6.3], Math.floor);
  console.log(res);
  
  console.log(countBy([{ n: 3 }, { n: 5 }, { n: 3 }], (o) => o.n));
  // => { '3': 2, '5': 1 }
  
  console.log(countBy([], (o) => o)); // => {}
  
  console.log(countBy([{ n: 1 }, { n: 2 }], (o) => o.m)); // => { undefined: 2 }


  //Reference: https://www.greatfrontend.com/interviews/study/lodash/questions/javascript/count-by
  