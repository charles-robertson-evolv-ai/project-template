import { rule, $, $$, $i, log } from './_setup.js';

export default () => {
    rule.instrument.add([
        ['body', () => $(document.body), { type: 'single' }],
        ['h1', () => $('h1'), { type: 'single' }],
    ]);
};
