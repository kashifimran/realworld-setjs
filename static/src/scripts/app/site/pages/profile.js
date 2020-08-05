import setjs from '@stateempire/setjs';
import {api} from 'core/api-helper.js';

export default {
  templates: ['site/profile'],
  preload: function(opts) {
    opts.username = opts.route.slug.replace(/^@/, '');
    api.getProfile(opts);
  },
  getComp: function(opts, profile) {
    return setjs.getComp('site/profile', {profile});
  }
};
