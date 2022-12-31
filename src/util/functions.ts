export const recursiveObjectMerge = (target: any, source: any) => {
    if (!source) return target;

    for (const key in source) {
        if (source.hasOwnProperty(key)) {
            if (source[key] instanceof Object) {
                Object.assign(source[key], recursiveObjectMerge(target[key], source[key]));
            }
        }
    }
    Object.assign(target || {}, source);
    return target;
};