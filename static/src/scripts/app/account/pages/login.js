import setjs from '@stateempire/setjs';
import {api} from 'core/api-helper.js';
import {formErrors} from 'helpers/site-helpers.js';

export default {
  templates: ['account'],
  getComp: function() {
    return setjs.getComp('account/login', null, {
      form: function({comp, $el, error}) {
        api.login({
          data: {user: $el.formJson()},
          error: formErrors(comp, error),
          success: function(result) {
            console.log(result);
            setjs.setRoute();
          }
        });
      }
    });
  }
};
