import setjs from '@stateempire/setjs';
import {articleLimit} from 'config/app-config.js';

export function getQs(ext) {
  var params = {
    // author: setjs.qs('author'),
    tag: setjs.qs('tag'),
    // favorited: setjs.qs('favorited'),
  };
  return qsParams($.extend(params, ext));
}

export function qsParams(params) {
  var str = '';
  $.each(params, function(name, val) {
    if (val) {
      str += (str ? '&' : '') + name + '=' + encodeURIComponent(val);
    }
  });
  return str;
}

export function createPages(articlesCount) {
  var pages = [];
  var currentPage = (setjs.qs('page') || 1);
  var lastPage = Math.ceil(articlesCount / articleLimit);
  for (var i = 1; i <= lastPage; i++) {
    pages.push({index: i, link: '?' + getQs({page: i}), cls: currentPage == i ? 'active' : ''});
  }
  return pages;
}
