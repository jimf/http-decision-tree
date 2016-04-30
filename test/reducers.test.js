import test from 'tape';
import R from 'ramda';
import subject from '../src/reducers';
import * as actions from '../src/actions';
import { reduceDecisionList } from '../src/util/decisions';
import decisions from '../decisions.json';
import strings from '../src/strings.json';

const decisionTree = reduceDecisionList(decisions);

const applyActions = (...actions) => initialState => (
    R.reduce(subject, initialState, actions)
);

test('reducers - initial state', t => {
    t.deepEqual(subject(undefined, {}), {
        tree: decisionTree,
        decisions: [],
        s: strings
    });

    t.end();
});

test('reducers.PUSH_DECISION', t => {
    const nextState = applyActions(
        {},
        actions.pushDecision(['decision1', 'yes']),
        actions.pushDecision(['decision2', 'no'])
    )();

    t.deepEqual(nextState.decisions, ['decision1', 'yes', 'decision2', 'no']);
    t.end();
});

test('reducers.START_OVER', t => {
    const nextState = applyActions(
        {},
        actions.pushDecision(['decision1', 'yes']),
        actions.startOver()
    )();

    t.deepEqual(nextState.decisions, []);
    t.end();
});
