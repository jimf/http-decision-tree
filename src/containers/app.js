import { Component } from 'react';
import { connect } from 'react-redux';
import R from 'ramda';
import h from 'react-hyperscript';
import { pushDecision, startOver } from '../actions';
import { CODE_MAP } from '../constants';

const renderQuestion = ({ question, choices, onMakeChoice, s }) => (
    h('div.questions', [
        h('h1', R.prop(question, s)),
        choices.map(choice => (
            h('span.choice', { key: `${question}-${choice}` }, [
                h('label', {
                    htmlFor: `${question}-${choice}`
                }, R.prop(choice, s)),
                h('input', {
                    type: 'radio',
                    key: `${question}-${choice}`,
                    id: `${question}-${choice}`,
                    name: question,
                    value: choice,
                    onChange: onMakeChoice
                })
            ])
        ))
    ])
);

const renderAnswer = ({ answer, onRestartClick, s }) => (
    h('div', [
        h('h1', {
            className: CODE_MAP[answer] || 'irrelevant'
        }, [answer, h('br'), R.prop(answer, s)]),
        h('button', { type: 'button', onClick: onRestartClick }, 'Start Over')
    ])
);

class AppContainer extends Component {
    render() {
        const { answer } = this.props;

        return h('div.app.animated.bounceInDown', [
            answer ? renderAnswer(this.props) : renderQuestion(this.props),
            h('footer', [
                h('div', 'An interactive version of'),
                h('div', null, h('a', {
                    href: 'http://racksburg.com/choosing-an-http-status-code/',
                    target: '_blank'
                }, 'Choosing an HTTP Status Code — Stop Making It Hard'))
            ])
        ]);
    }
}

export const mapStateToProps = state => {
    const { tree, decisions, s } = state;
    const ref = R.path(decisions, tree);

    if (typeof ref === 'string') {
        return { answer: ref, s };
    }

    const question = R.compose(R.head, R.keys)(ref);
    const choices = R.compose(R.keys, R.head, R.values)(ref);

    return { question, choices, s };
};

export const mapDispatchToProps = dispatch => ({
    onMakeChoice: R.compose(
        dispatch,
        pushDecision,
        R.juxt([R.prop('name'), R.prop('value')]),
        R.prop('target')
    ),
    onRestartClick: R.partial(dispatch, [startOver()])
});

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
