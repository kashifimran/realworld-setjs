import setjs from '@stateempire/setjs';
import {api} from 'core/api-helper.js';
import {qsParams} from 'helpers/site-helpers.js';
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
    pageData.pages = createPages(pageData);
    return setjs.getComp('site/home', pageData);
  }
};

function createPages({articlesCount}) {
  var pages = [];
  var currentPage = (setjs.qs('page') || 1);
  var lastPage = Math.ceil(articlesCount / articleLimit);
  for (var i = 1; i <= lastPage; i++) {
    pages.push({index: i, link: '?' + getQs({page: i}), cls: currentPage == i ? 'active' : ''});
  }
  return pages;
}

function getQs(ext) {
  var params = {
    author: setjs.qs('author'),
    tag: setjs.qs('tag'),
    favorited: setjs.qs('favorited'),
  };
  return qsParams($.extend(params, ext));
}
