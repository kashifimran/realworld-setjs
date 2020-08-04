import setjs from '@stateempire/setjs';

export default {
  templates: ['site/profile'],
  getComp: function() {
    return setjs.getComp('site/profile');
  }
};
