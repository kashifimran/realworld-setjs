import setjs from '@stateempire/setjs';
import {api} from 'core/api-helper.js';

export default {
  templates: ['account'],
  getComp: function() {
    return setjs.getComp('account/signup', null, {
      form: function({$el, error}) {
        api.signup({
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
