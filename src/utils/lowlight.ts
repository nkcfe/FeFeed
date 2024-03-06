import css from 'highlight.js/lib/languages/css';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';
import bash from 'highlight.js/lib/languages/bash';

import { createLowlight } from 'lowlight';

const lowlight = createLowlight();

lowlight.register({ html });
lowlight.register({ css });
lowlight.register({ js });
lowlight.register({ ts });
lowlight.register({ bash });

export { lowlight };
