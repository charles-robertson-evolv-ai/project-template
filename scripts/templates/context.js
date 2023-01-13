import { rule, $, $$, $i, store, app, log } from './_imports/_setup.js';
import instrumentPage from './_imports/_instrument.js';
__variantImports__;

rule.id = '__contextId__';
__variantDeclarations__;

instrumentPage();
