import setjs from '@stateempire/setjs';
import marked from 'marked';
import eventManager, {eventTypes} from 'setbp/kernel/event-manager.js';
import {api} from 'core/api-helper.js';

setjs.addFuncs({
  marked: function(content, {$el}) {
    $el.html(marked(content));
  },
  canFollow: function(author) {
    var user = api.getUser();
    return user && user.username != author.username;
  },
  deleteArticleBtn: function(article, {$el}) {
    $el.off('.del').on('click.del', function() {
      if (window.confirm('Do you really want to delete this article?')) {
        api.deleteArticle({
          slug: article.slug,
          error: function() {
            alert('Unable to delete article. Please try again');
          },
          success: function() {
            setjs.setRoute('profile/@' + article.author.username);
          }
        });
      }
    });
  },
});

setjs.addAction('toggleFavorite', function(opts) {
  var data = opts.data;
  var article = data.article;
  api.toggleFavorite({
    article,
    error: function() {
      alert('Unable to toggle favorited. Please try again');
      article.favorited = !article.favorited;
      raiseEvent();
    },
    success: function(res) {
      $.extend(article, res.article);
      raiseEvent();
    },
  });
  raiseEvent();

  function raiseEvent() {
    opts.comp.update();
    eventManager.raiseEvent(eventTypes.post_fav, opts);
  }
});
