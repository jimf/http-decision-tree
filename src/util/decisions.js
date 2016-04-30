import R from 'ramda';
import deepmerge from 'deepmerge';
import { para } from './fp';

/**
 * Reducer function for transforming a single "decision" array to a nested
 * object structure.
 *
 * Decision array must be reversed.
 *
 * @param {object} acc Accumulated value
 * @param {string} x Decision value
 * @param {string[]} xs Remaining decision values
 * @return {object}
 */
const decisionReducer = (acc, x, xs) => {
    const [_, next] = xs;
    if (R.isEmpty(acc)) {
        return { [next]: x };
    }
    if (x in acc) { return acc; }
    return { [x]: acc };
};

/**
 * Fold a list of decision arrays into a single object structure.
 *
 * @param {string[][]} decisions Decisions to fold
 * @return {object}
 */
export const reduceDecisionList = R.compose(
    R.reduce(deepmerge, {}),
    R.map(R.compose(para(decisionReducer, {}), R.reverse))
);
