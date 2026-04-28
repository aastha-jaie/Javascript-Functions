


/*
Q: You are given a deeply nested JavaScript object.
     Write a function that extracts all leaf properties and returns them in a new flat object.
*/

function flattenObject(object){
    if(typeof object !== "object" || object === null){
        return {};
    }
    let result = {}
    function traverse(current){
        for(let [key,value] of Object.entries(current)){
            const isPlainObj = typeof value === 'object' && value !== null && !Array.isArray(value);
    
            if(isPlainObj){
                traverse(value);
            }
            else{
                result[key] = value;
            }
        }
    }
    traverse(object)
  
    return result;
}
const obj = {
    a: 1,
    b: {
      c: 2,
      d: 3,
      e: { f: null },
    },
    g: 4,
    h: undefined,
  };
  const flatten = flattenObject(obj);
  
  console.log(flatten); //{a:1, c: 2, d:3, f:null, g:4, h: undefined}