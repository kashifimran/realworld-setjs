import setjs from '@stateempire/setjs';
import {api} from 'core/api-helper.js';

export default {
  templates: ['site/view'],
  preload: function(opts) {
    opts.slug = opts.oute.slug;
    api.getArticle(opts);
  },
  getComp: function(opts, article) {
    return setjs.getComp('site/view', {article});
  }
};
