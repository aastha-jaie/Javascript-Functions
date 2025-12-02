// flatten([1, [2, [3,[5]]], 4]) 


function flatten(arr,depth){
    let result = [];
   for(let i=0;i<arr.length;i++){
    if(Array.isArray(arr[i]) && depth >0){
        result = result.concat(flatten(arr[i],depth-1)) //remember this. always concat the values in result rather than push to append the values
    }
    else{
        result.push(arr[i])
    }
   }
   return result;
}
console.log(flatten([1, [2, [3,[5]]], 4],3) 
)