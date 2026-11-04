import fs from 'fs';
import path from 'path';
import assert from 'assert';

const root = process.cwd();
const clientLayout = fs.readFileSync(path.join(root, 'components', 'ClientLayout.tsx'), 'utf8');
const rootLayout = fs.readFileSync(path.join(root, 'app', 'layout.tsx'), 'utf8');

assert(!clientLayout.includes('AnimatePresence'), 'ClientLayout should not wrap route changes in AnimatePresence');
assert(!clientLayout.includes('motion.main'), 'ClientLayout should render a stable main element without route enter animations');
assert(!clientLayout.includes('setTimeout'), 'ClientLayout should not add an artificial loading delay');
assert(!rootLayout.includes('NavigationProgressBar'), 'Root layout should not mount a navigation progress animation on route changes');
