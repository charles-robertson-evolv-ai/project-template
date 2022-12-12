import { rule } from './setup.js';
import { instrumentPage } from './instrumentPage.js';

function start() {}

instrumentPage();

rule.app = { start };
