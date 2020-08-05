import setjs from '@stateempire/setjs';
import {api} from 'core/api-helper.js';
import {cascadeRoleFlag} from 'setbp/kernel/roles.js';
import {formErrors} from 'helpers/site-helpers.js';

export default {
  templates: ['account'],
  role: cascadeRoleFlag('public'),
  getComp: function() {
    return setjs.getComp('account/settings', {user: api.getUser()}, {
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
