import {addPage} from 'setbp/kernel/page-manager.js';

import './api.js';
import './template-functions.js';
import editor from './pages/editor.js';

export default function() {
  addPage('editor', editor);
}
