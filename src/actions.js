import { createAction } from 'redux-actions';

export const PUSH_DECISION = 'PUSH_DECISION';
export const START_OVER = 'START_OVER';

export const pushDecision = createAction(PUSH_DECISION);
export const startOver = () => ({ type: START_OVER });
