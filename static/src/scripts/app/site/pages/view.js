import setjs from '@stateempire/setjs';
import {api} from 'core/api-helper.js';
import {batchCall} from 'setbp/utility/calls.js';

export default {
  templates: ['site/view'],
  preload: function(opts) {
    var slug = opts.route.slug;
    batchCall(opts)
    .add(api.getArticle, {slug}, 'articleRes')
    .add(api.getComments, {slug}, 'commentsRes')
    .go();
  },
  getComp: function(opts, {articleRes, commentsRes}) {
    var {article} = articleRes;
    var {comments} = commentsRes;
    var pageComp = setjs.getComp('site/view', {article, comments}, {
      toggleFollow: function() {
        var user = article.author;
        api.toggleFollow({
          user,
          error: function() {
            user.following = !user.following;
            pageComp.updateMeta();
            alert('Unable to change following. Please try again');
          },
        });
        pageComp.updateMeta();
      },
      saveComment: function({$el, error, end}) {
        api.saveComment({
          slug: article.slug,
          data: $el.formJson(),
          error,
          success: function({comment}) {
            comments.unshift(comment);
            pageComp.renderList('comments');
            $el.find('textarea').val('');
            end();
          },
        });
      },
      deleteComment: function({data}) {
        var copy = comments.slice();
        comments.splice(data.key, 1);
        pageComp.renderList('comments');
        api.deleteComment({
          slug: article.slug,
          commentId: data.comment.id,
          error: function() {
            comments = pageComp.data.comments = copy;
            pageComp.renderList('comments');
            alert('Unable to delete comment. Please try later');
          },
        });
      },
    });
    pageComp.updateMeta = function() {
      pageComp.headerMeta.update();
      pageComp.footerMeta.update();
    };
    return pageComp;
  }
};
