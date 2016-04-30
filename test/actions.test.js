import test from 'tape';
import { camelize } from 'humps';
import * as subject from '../src/actions';

test('actions - action types', t => {
    const expected = {
        PUSH_DECISION: 'PUSH_DECISION',
        START_OVER: 'START_OVER'
    };

    Object.keys(expected).forEach(key => {
        t.equal(subject[key], expected[key]);
    });

    t.end();
});

test('actions - payload-expecting action creators', t => {
    const testcase = actionType => {
        const actionCreatorName = camelize(actionType.toLowerCase());
        const payload = 'dummy-payload';

        t.deepEqual(subject[actionCreatorName](payload), {
            type: actionType,
            payload
        });
    };

    const cases = [
        subject.PUSH_DECISION
    ];

    cases.forEach(testcase);

    t.end();
});

test('actions.startOver()', t => {
    t.deepEqual(subject.startOver(), { type: subject.START_OVER });
    t.end();
});
