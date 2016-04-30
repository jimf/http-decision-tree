import R from 'ramda';

const STANDARD_CODES = '200 301 302 400 404 500'.split(' ');
const USEFUL_CODES =
    '201 202 303 401 403 405 406 409 412 415 429 502 503'.split(' ');

// { [code]: classification } mapping
export const CODE_MAP = R.merge(
    R.zipObj(STANDARD_CODES, R.map(R.always('standard'), STANDARD_CODES)),
    R.zipObj(USEFUL_CODES, R.map(R.always('useful'), USEFUL_CODES))
);
