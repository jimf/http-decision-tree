import R from 'ramda';
import * as actions from './actions';
import { reduceDecisionList } from './util/decisions';
import decisions from '../decisions.json';
import strings from './strings.json';

const decisionTree = reduceDecisionList(decisions);

const initialState = () => ({
    tree: decisionTree,
    decisions: [],
    s: strings
});

const reducers = {};

const L = {
    decisions: R.lensProp('decisions')
};

reducers[actions.PUSH_DECISION] = (state, { payload }) => {
    return R.over(L.decisions, R.concat(R.__, payload), state);
};

reducers[actions.START_OVER] = R.set(L.decisions, []);

const appReducer = (state = initialState(), action) => (
    action.type in reducers
        ? reducers[action.type](state, action)
        : state
);

export default appReducer;
