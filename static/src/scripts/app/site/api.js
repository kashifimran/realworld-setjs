import {addApis, ajaxCall} from 'core/api-helper.js';

addApis({
  getProfile,
  getTags,
  getArticle,
  saveArticle,
  getArticles,
});

function getProfile(opts) {
  ajaxCall($.extend({}, opts, {type: 'GET', relativeUrl: 'profiles/' + opts.username}));
}

function getTags(opts) {
  ajaxCall($.extend({type: 'GET'}, opts, {relativeUrl: 'tags'}));
}

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

function getArticles(opts) {
  var url = 'articles';
  if (opts.feed) {
    url += '/feed';
  }
  ajaxCall($.extend({}, opts, {type: 'GET', relativeUrl: url + `?${opts.query}`}));
}
