export const isPromise = (value: any): boolean => !!(
    value &&
    value.then &&
    typeof value.then === 'function'
)