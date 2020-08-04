import setjs from '@stateempire/setjs';
import {api} from 'core/api-helper.js';
import {formErrors} from 'helpers/site-helpers.js';

export default {
  templates: ['article/editor'],
  preload: function(opts) {
    if (opts.route.slug) {
      opts.slug = opts.route.slug;
      api.getArticle(opts);
    } else {
      opts.success({});
    }
  },
  getComp: function(opts, article) {
    article.tagList  = article.tagList || [];
    return setjs.getComp('article/editor', null, {
      addTag: function({e, $el}) {
        if (e.which == 13) {
          var val = $el.val().trim();
          e.preventDefault();
          e.stopPropagation();
          if (val) {
            article.tagList.push();
          }
        }
      },
      form: function({comp, $el, error}) {
        api.saveArticle({
          data: {article: $el.formJson({tagList})},
          error: formErrors(comp, error),
          success: function() {
            setjs.setRoute();
          }
        });
      }
    });
  }
};
