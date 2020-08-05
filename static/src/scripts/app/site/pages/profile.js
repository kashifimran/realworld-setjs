import setjs from '@stateempire/setjs';
import {api} from 'core/api-helper.js';
import {batchCall} from 'setbp/utility/calls.js';
import {qsParams, createPages} from 'helpers/site-helpers.js';

export default {
  templates: ['site/profile'],
  preload: function(opts) {
    var username = opts.route.slug.replace(/^@/, '');
    var query = qsParams(opts.route.id == 'favorited' ? {favorited: username} : {author: username});
    batchCall(opts)
    .add(api.getProfile, {username}, 'profileRes')
    .add(api.getArticles, {query}, 'articlesRes')
    .go();
  },
  getComp: function(opts, {profileRes, articlesRes}) {
    console.log(profileRes, articlesRes);
    var profile = profileRes.profile;
    var pageData = {
      profile,
      articles: articlesRes.articles,
      pages: createPages(articlesRes.articlesCount),
    };
    var pageComp = setjs.getComp('site/profile', pageData, {
      toggleFollow: function() {
        api.toggleFollow({
          user: profile,
          error: function() {
            profile.following = !profile.following;
            pageComp.update();
            alert('Unable to change following. Please try again');
          },
        });
        pageComp.update();
      }
    });
    return pageComp;
  }
};
