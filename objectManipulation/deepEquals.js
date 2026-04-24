
function deepEquals(valueOne, valueTwo) {
    //check NaN value
    if (Number.isNaN(valueOne) && Number.isNaN(valueTwo)) {
      return true;
    }
    //check null or undefined
    if (
      valueOne === null ||
      valueOne === undefined ||
      valueTwo === null ||
      valueTwo === undefined
    ) {
      return valueOne === valueTwo;
    }
    if (typeof valueOne !== "object" && typeof valueTwo !== "object") {
      return valueOne === valueTwo;
    }
    //check array
    if (Array.isArray(valueOne) && Array.isArray(valueTwo)) {
      if (valueOne.length !== valueTwo.length) {
        return false;
      }
      for (let i = 0; i < valueOne.length; i++) {
        if (!deepEquals(valueOne[i], valueTwo[i])) {
          return false;
        }
      }
      return true;
    }
    if (Array.isArray(valueOne) || Array.isArray(valueTwo)) {
      return false;
    }

    //check objects recursively - first check it's key and every corrosponding values
    let keysOne = Object.keys(valueOne);
    let keysTwo = Object.keys(valueTwo);
  
    if (keysOne.length !== keysTwo.length) {
      return false;
    }
    for (let key of keysOne) {
      if (!keysTwo.includes(key) || !deepEquals(valueOne[key], valueTwo[key])) {
        return false;
      }
    }
    return true;
  }

deepEquals(NaN, NaN) // true
deepEquals([1, 2, [3]], [1, 2, [3]]) // true
deepEquals({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } }) // true
deepEquals(null, undefined) // false
deepEquals([1, 2, 3], { 0: 1, 1: 2, 2: 3 }) // false