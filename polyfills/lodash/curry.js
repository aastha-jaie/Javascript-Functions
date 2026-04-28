
/* Implement currying function which can take any type of arguments */

function curry(fn){
    let result = [];
    let length = fn.length;
    let context = null;
    function curried(...args){
        result.push(...args);
        if(!context){
            context = this;
        }
        if(result.length >= fn.length){
            let ans = fn.apply(context,result);
            result =[];
            return ans;
        }
        else{
            return curried;
        }
    }
    return curried;
}

const add = (a, b, c, d, e) => {
    return a + b + c + d + e;
  };
  
  
  const curriedAdd = curry(add);
  
  console.log(curriedAdd(1, 2, 3, 4, 5));      // 15
  console.log(curriedAdd(1)(2, 3, 4, 5));      // 15
  console.log(curriedAdd(1, 2)(3, 4, 5));      // 15
  console.log(curriedAdd(1, 2, 3, 4)(5));  


  //E.g 2

  const obj = {
    x: 11,
    add(a, b) {
      return this.x + a + b;
    }
  };
  
  const curried = curry(obj.add);
  const bound = curried.bind(obj);
  
  console.log(bound(2)(3));