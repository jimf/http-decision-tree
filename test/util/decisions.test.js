import test from 'tape';
import * as subject from '../../src/util/decisions';

test('util.decisions.reduceDecisionList()', t => {
    const decisions = [
        ['outlook', 'sunny', 'windy', 'no', 'play'],
        ['outlook', 'sunny', 'windy', 'yes', 'do not play'],
        ['outlook', 'overcast', 'play'],
        ['outlook', 'rainy', 'humidity', 'high', 'do not play'],
        ['outlook', 'rainy', 'humidity', 'normal', 'play']
    ];
    const expected = {
        outlook: {
            sunny: {
                windy: {
                    no: 'play',
                    yes: 'do not play'
                },
            },
            overcast: 'play',
            rainy: {
                humidity: {
                    high: 'do not play',
                    normal: 'play'
                }
            }
        }
    };

    t.deepEqual(subject.reduceDecisionList(decisions), expected);

    t.end();
});
