import test from 'tape';
import {
    Node,
    Leaf,
    nodeValue,
    decisionToTree,
    defineBranch
    // merge
} from '../src/tree';

test('tree - Leaf', t => {
    const value = 42;
    const actual = Leaf(value);

    t.equal(actual.value, value, 'stores reference to given value');

    t.end();
});

test('tree - Node with value only', t => {
    const value = 42;
    const actual = Node(value);

    t.equal(actual.value, value, 'stores reference to given value');
    t.deepEqual(actual.branches, {}, 'initializes with no defined branches');

    t.end();
});

test('tree - Node with branches', t => {
    const value = 42;
    const branches = { yes: Leaf(1), no: Leaf(0) };
    const actual = Node(value, branches);

    t.equal(actual.value, value, 'stores reference to given value');
    t.deepEqual(actual.branches, branches,
                'stores reference to given branches');

    t.end();
});

test('tree - nodeValue()', t => {
    const value = 42;

    t.equal(nodeValue(Leaf(value)), value, 'gets value from a Leaf');
    t.equal(nodeValue(Node(value)), value, 'gets value from a Node');

    t.end();
});

test('tree - defineBranch()', t => {
    const node = Node('outlook', {
        'sunny': Leaf('play')
    });
    const leaf = Leaf('play');
    const defineRainy = defineBranch('rainy', Leaf('do not play'));
    const expected = Node('outlook', {
        'sunny': Leaf('play'),
        'rainy': Leaf('do not play')
    });

    t.deepEqual(defineRainy(node), expected, 'defines branch on a given node');
    t.deepEqual(defineRainy(leaf), leaf, 'does nothing on leaves');
    t.notOk(node.branches.rainy, 'returns a new tree');

    t.end();
});

test('tree - decisionToTree()', t => {
    const decision = ['outlook', 'sunny', 'windy', 'no', 'play'];
    const expected = Node('outlook', {
        sunny: Node('windy', {
            no: Leaf('play')
        })
    });

    t.deepEqual(decisionToTree(decision), expected);

    t.end();
});

// test('tree - merge()', t => {
//     const tree1 = Node('outlook', {
//         sunny: Node('windy', {
//             no: Leaf('play')
//         })
//     });
//     const tree2 = Node('outlook', {
//         sunny: Node('windy', {
//             yes: Leaf('do not play')
//         })
//     });
//     const expected = Node('outlook', {
//         sunny: Node('windy', {
//             no: Leaf('play'),
//             yes: Leaf('do not play')
//         })
//     });

//     t.deepEqual(merge(tree1, tree2), expected);

//     t.end();
// });

// test('tree - fromDecisionList()', t => {
//     const decisions = [
//         ['outlook', 'sunny', 'windy', 'no', 'play'],
//         ['outlook', 'sunny', 'windy', 'yes', 'do not play'],
//         ['outlook', 'overcast', 'play'],
//         ['outlook', 'rainy', 'humidity', 'high', 'do not play'],
//         ['outlook', 'rainy', 'humidity', 'normal', 'play']
//     ];
//     const expected = Node('outlook', {
//         sunny: Node('windy', {
//             no: Leaf('play'),
//             yes: Leaf('do not play')
//         }),
//         overcast: Leaf('play'),
//         rainy: Node('humidity', {
//             high: Leaf('do not play'),
//             normal: Leaf('play')
//         })
//     });

//     t.deepEqual(fromDecisionList(decisions), expected);

//     t.end();
// });
