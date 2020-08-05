import setjs from '@stateempire/setjs';
import {api} from 'core/api-helper.js';
import {cascadeRoleFlag} from 'setbp/kernel/roles.js';

export default {
  templates: ['account'],
  role: cascadeRoleFlag('public'),
  getComp: function() {
    return setjs.getComp('account/settings', {user: api.getUser()}, {
      form: function({$el, error}) {
        api.updateUser({
          data: {user: $el.formJson()},
          error,
          success: function() {
            setjs.setRoute();
          }
        });
      }
    });
  }
};
