import setjs from '@stateempire/setjs';
import {api} from 'core/api-helper.js';

export default {
  templates: ['site/editor'],
  preload: function(opts) {
    console.log(opts.route);
    if (opts.route.slug) {
      opts.slug = opts.route.slug;
      api.getArticle(opts);
    } else {
      opts.success({article: {}});
    }
  },
  getComp: function(opts, {article}) {
    article.tagList  = article.tagList || [];
    var pageComp = setjs.getComp('site/editor', {article}, {
      addTag: function({e, $el}) {
        if (e.which == 13) {
          var val = $el.val().trim();
          e.preventDefault();
          e.stopPropagation();
          $el.val('');
          if (val && article.tagList.indexOf(val) < 0) {
            article.tagList.push(val);
            pageComp.renderList('tagList');
          }
        }
      },
      removeTag: function({data}) {
        article.tagList.splice(data.key, 1);
        pageComp.renderList('tagList');
      },
      form: function({$el, error}) {
        console.log({article: $el.formJson({tagList: article.tagList})});
        api.saveArticle({
          data: {article: $el.formJson({tagList: article.tagList})},
          error,
          success: function() {
            setjs.setRoute();
          }
        });
      }
    });
    return pageComp;
  }
};