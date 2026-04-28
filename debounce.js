
function debounce (fn, delay){
    let timeout;

    return function(args){
        clearTimeout(timeout)
        timeout = setTimeout(()=>
            fn.apply(this, args),
        delay)
    }
}

const search = debounce((query) => fetchResults(query), 300);

/**
    Follow up:

    1. How would you add a leading edge option — fire immediately on first call, then debounce?" 
    2. What's the difference between debounce and throttle?
    3. "How would you cancel it?"
 */
