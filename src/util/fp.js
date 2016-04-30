import R from 'ramda';

/**
 * Paramorphism
 *
 * @param {function} f Reducer
 * @param {*} acc Seed value
 * @param {*} xs Value(s) to be reduced
 * @return {*}
 */
export const para = R.curry((f, acc, xs) => {
    if (xs.length === 0) { return acc; }
    return para(f, f(acc, R.head(xs), xs), R.tail(xs));
});
