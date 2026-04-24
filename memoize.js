
/*
 - This is the basic version of memoization
 - Why JSON.stringify as the cache key?
      It handles multiple arguments generically. 
      The trade-off is that it fails for arguments with circular references or functions — you can mention that and offer a custom serializer as an improvement.
 - Why Map over a plain object?
      Map preserves insertion order (useful for LRU eviction), has O(1) get/set, and doesn't have prototype pollution issues.
*/
function memoize(fn) {
    let cache = new Map();
  
    return function (...args) {
      const key = JSON.stringify(args);
      if (cache.has(key)) {
        console.log("cache hit", key);
        return cache.get(key);
      }
      const result = fn(...args);
      cache.set(key, result);
      return result;
    };
  }
  
  const add = (a, b) => a + b;
  const memoizedAdd = memoize(add);
  
  console.log(memoizedAdd(2, 3)); // computed → 5
  console.log(memoizedAdd(2, 3)); // cache hit → 5
  console.log(memoizedAdd(4, 5)); // computed → 9
  

  /* Advanced version */

  /* Generally caching comes with expiry time and deletion function */

  function memoizeFn(fn,options = {}){
    const cache = new Map();

      const {ttl, maxSize} = options;
     const memoizedFn = function (...args){
      let key = JSON.stringify(args);
      const now = Date.now();

      if(cache.get(key)){
        const entry = cache.get(key);
        const isExpired = cache.expiresAt !== null && now > entry.expiresAt;

        if(!isExpired){
          return entry.value
        }
        cache.delete(key);
      }
      if(maxSize && maxSize >= cache.size()){
        const oldestKey = cache.keys().next().value;
        cache.delete(oldestKey);
      }
      const result = fn(...args);
      cache.set(key, {
        value:result,
        expiresAt: ttl ? now + ttl : null
      })
      return result;

    }
    memoizedFn.clearCache = () => cache.clear();
    memoizedFn.cacheSize = () => cache.size;

    return memoizeFn;
  }

  const fetchUserData = (userId) => {
    console.log(`Fetching user ${userId}...`);
    return { id: userId, name: "Alice" };
  };
  
  const memoizedFetch = memoize(fetchUserData, { ttl: 5000, maxSize: 3 });
  
  memoizedFetch(1);  // Fetching user 1...
  memoizedFetch(1);  // cache hit — no log
  memoizedFetch(2);  // Fetching user 2...