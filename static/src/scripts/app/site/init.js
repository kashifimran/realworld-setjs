import {addPage} from 'setbp/kernel/page-manager.js';

import './api.js';
import './template-functions.js';

import home from './pages/home.js';
import profile from './pages/profile.js';

export default function() {
  addPage('', home);
  addPage('profile/[^/]+', profile);
}
