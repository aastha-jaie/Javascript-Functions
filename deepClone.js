function deepClone(value){
    if(!value || typeof value !== 'object'){
        return value;
    }
    if(Array.isArray(value)){
        return value.map((item) => deepClone(item));
    }
    return Object.keys(value).reduce((acc,red)=>{
        acc[red] = deepClone(value[red]);
        return acc;
    },{})
}


const obj1 = { user: { role: 'admin' } };
const clonedObj1 = deepClone(obj1);

clonedObj1.user.role = 'guest'; // Change the cloned user's role to 'guest'.
console.log(clonedObj1.user.role) // 'guest'
console.log(obj1.user.role) // Should still be 'admin'.

const obj2 = { foo: [{ bar: 'baz' }] };
const clonedObj2 = deepClone(obj2);

obj2.foo[0].bar = 'bax'; // Modify the original object.
obj2.foo[0].bar; // 'bax'
clonedObj2.foo[0].bar; // Should still be 'baz'.

//Test cases from GreatFrontend