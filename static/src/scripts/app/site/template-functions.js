import setjs from '@stateempire/setjs';
import {api} from 'core/api-helper.js';

setjs.addFuncs({
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

setjs.addAction('toggleFavorite', function({comp, data}) {
  var article = data.article;
  api.toggleFavorite({
    article,
    error: function() {
      alert('Unable to toggle favorited. Please try again');
      article.favorited = !article.favorited;
      updateComps();
    },
    success: function(res) {
      $.extend(data.article, res.article);
      updateComps();
    },
  });
  updateComps();

  function updateComps() {
    comp.rComp.updateMeta();
  }
});
