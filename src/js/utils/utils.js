const Utils = {
  isObject(o) {
    return typeof o === 'object' && o !== null && o.constructor && o.constructor === Object;
  },

  flattenArray(arr) {
    return arr.reduce((a, b) => a.concat(Array.isArray(b) ? Utils.flattenArray(b) : b), []);
  },

  toArray(o) {
    if (Array.isArray(o)) return o;
    if (typeof o === 'string') o = document.querySelectorAll(o) || o;
    if (o instanceof NodeList || o instanceof HTMLCollection) {
      return [].slice.call(o);
    }
    return [o];
  },

  parseTargets(targets) {
    if (targets) {
      return Utils.flattenArray(Array.isArray(targets) ? targets.map(Utils.toArray) : Utils.toArray(targets));
    }
    return [];
  },

  extend(...args) {
    const to = Object(args[0]);
    for (let i = 1; i < args.length; i += 1) {
      const nextSource = args[i];
      if (nextSource !== undefined && nextSource !== null) {
        const keysArray = Object.keys(Object(nextSource));
        for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
          const nextKey = keysArray[nextIndex];
          const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
          if (desc !== undefined && desc.enumerable) {
            if (Utils.isObject(to[nextKey]) && Utils.isObject(nextSource[nextKey])) {
              Utils.extend(to[nextKey], nextSource[nextKey]);
            } else if (!Utils.isObject(to[nextKey]) && Utils.isObject(nextSource[nextKey])) {
              to[nextKey] = {};
              Utils.extend(to[nextKey], nextSource[nextKey]);
            } else {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
    }
    return to;
  },
};
export default Utils;