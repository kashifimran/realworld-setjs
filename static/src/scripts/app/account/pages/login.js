import setjs from '@stateempire/setjs';
import {api} from 'core/api-helper.js';
import {getQs} from 'setbp/utility/browser.js';

export default {
  templates: ['account'],
  getComp: function() {
    return setjs.getComp('account/login', null, {
      form: function({$el, error}) {
        api.login({
          data: {user: $el.formJson()},
          error,
          success: function() {
            setjs.setRoute(getQs('url'));
          }
        });
      }
    });
  }
};
