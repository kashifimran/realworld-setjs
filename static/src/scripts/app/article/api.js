import {addApis, ajaxCall} from 'core/api-helper.js';

addApis({
  getArticle,
  saveArticle,
});

function getArticle(opts) {
  ajaxCall($.extend({type: 'GET'}, opts, {relativeUrl: 'articles/' + opts.slug}));
}

function saveArticle(opts) {
  if (opts.data.slug) {
    ajaxCall($.extend({}, opts, {relativeUrl: 'articles/' + opts.data.slug, type: 'PUT'}));
  } else {
    ajaxCall($.extend({}, opts, {relativeUrl: 'articles'}));
  }
}
