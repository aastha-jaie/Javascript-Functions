Array.prototype.myReduce = function (callback, initialValue) {
    let i = initialValue ? 0 : 1;
    let acc = initialValue || this[0];
    for (i; i < this.length; i++) {
      acc = callback(acc, this[i]);
    }
    return acc;
  };
  
  const arr = [1, 2, 3, 4];
  
  const res = arr.reduce((acc, curr) => acc + curr, 10);
  console.log("res", res);
  
  const resp = arr.myReduce((acc, curr) => acc + curr, 0);
  console.log("res", resp);
  