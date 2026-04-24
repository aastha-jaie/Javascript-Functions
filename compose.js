function compose(...funcs) {
    // Write your code here
   return function(initialValue){
    return funcs.reduceRight((acc,currentFn)=>{
        return currentFn(acc);
    }, initialValue)
   }
  }
  
  const double = (x) => x * 2;
  const increment = (x) => x + 1;
  const square = (x) => x * x;
  
  const composedFunc = compose(square, increment, double);
  const result = composedFunc(5); // ((5 * 2) + 1)^2 = 121
  console.log("result", result);
  