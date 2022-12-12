import { rule, store, $, $$ } from './setup.js';

// rule.isActive = () => {
//     return Array.from(document.documentElement.classList).includes(
//         'evolv_web_ctx1'
//     );
// };

export function instrumentPage() {
    store.instrumentDOM({
        body: {
            get dom() {
                return $('body');
            },
        },
    });
}
