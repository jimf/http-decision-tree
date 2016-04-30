import R from 'ramda';

// -- Constructors ------------------------------------------------------
const Empty = {};

export function Leaf(value) {
    if (!(this instanceof Leaf)) {
        return new Leaf(value);
    }

    this.value = value;
}

export function Node(value, branches = {}) {
    if (!(this instanceof Node)) {
        return new Node(value, branches);
    }

    this.value = value;
    this.branches = branches;
}


// -- Functor -----------------------------------------------------------
Empty.map = () => Empty;

Leaf.prototype.map = function() {
    return Leaf(this.value);
};

Node.prototype.map = function(f) {
    return Node(this.value, f(this.branches));
};


// -- Folds -------------------------------------------------------------
Empty.fold = (f, acc) => acc;

Leaf.prototype.fold = function(f, acc) {
    return f(acc, this.value);
};

Node.prototype.fold = function(f, acc) {
    // return
};


// -- Utils -------------------------------------------------------------

export const nodeValue = R.prop('value');

export const defineBranch = R.curry((branchName, value, tree) => {
    return tree.map(R.assoc(branchName, value));
});

// export const merge = R.curry((left, right) => {
// });

// export const decisionToTree = xs => {
//     switch (xs.length) {
//         case 0: return Empty;
//         case 1: return Leaf(xs[0]);
//         default:
//             const [value, branchName, ...rest] = xs;
//             return defineBranch(branchName, decisionToTree(rest), Node(value));
//     }
// };

export const decisionToTree = R.compose(
    R.reduceRight((acc, [x, y]) => {
        if (!y) { return Leaf(x); }
        return Node(x).map(R.assoc(y, acc));
    }, Empty),
    R.splitEvery(2)
);

// export const decisionObjToTree = obj => {
//     const foldToTree = (acc, x) => {
//         if (typeof x === 'string') { return Leaf(obj); }

//         const keys = Object.keys(obj);

//     }

// }
