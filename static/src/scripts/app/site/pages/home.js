import setjs from '@stateempire/setjs';
import {api} from 'core/api-helper.js';
import {getQs, createPages} from 'helpers/site-helpers.js';
import {articleLimit} from 'config/app-config.js';

export default {
  templates: ['site/home'],
  preload: function(opts) {
    opts.feed = opts.route.pageId == 'my-feed';
    opts.query = getQs({
      offset: articleLimit * ((setjs.qs('page') || 1) - 1),
      limit: articleLimit,
    });
    api.getArticles(opts);
  },
  getComp: function(opts, pageData) {
    pageData.pages = createPages(pageData.articlesCount);
    pageData.tag = setjs.qs('tag');
    pageData.tab = pageData.tag ? 'tag' : setjs.route().pageId || 'home';
    return setjs.getComp('site/home', pageData);
  }
};
