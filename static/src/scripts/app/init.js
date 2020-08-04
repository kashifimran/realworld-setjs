import './seo.js';

import accountInit from './account/init.js';
import siteInit from './site/init.js';
import articleInit from './article/init.js';

export default function({success}) {
  siteInit();
  articleInit();
  accountInit(success);
}
