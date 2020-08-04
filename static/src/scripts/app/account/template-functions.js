import setjs from '@stateempire/setjs';
import {roleFlag, testRole} from 'setbp/kernel/roles.js';
import {api} from 'core/api-helper.js';

function createRoleToggle(show) {
  return function(val, {$el}, ...roles) {
    var result = testRole(roleFlag(roles));
    $el.toggle(show ? result : !result);
  };
}

setjs.addFuncs({
  testRole: function(val, opts, ...roles) {
    return testRole(roleFlag(roles));
  },
  showTo: createRoleToggle(1),
  hideFrom: createRoleToggle(),
});

setjs.addAction('logout', function() {
  api.logout();
  setjs.setRoute('');
});
