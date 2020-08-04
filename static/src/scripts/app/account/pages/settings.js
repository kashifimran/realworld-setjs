import setjs from '@stateempire/setjs';
import {api} from 'core/api-helper.js';
import {formErrors} from 'helpers/site-helpers.js';

export default {
  templates: ['account'],
  getComp: function() {
    return setjs.getComp('account/settings', null, {
      form: function({comp, $el, error}) {
        api.updateUser({
          data: {user: $el.formJson()},
          error: formErrors(comp, error),
          success: function() {
            setjs.setRoute();
          }
        });
      }
    });
  }
};
