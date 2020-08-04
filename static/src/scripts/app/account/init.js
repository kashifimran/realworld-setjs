import setjs from '@stateempire/setjs';
import pageLoader from 'setbp/kernel/page-loader.js';
import {addPage} from 'setbp/kernel/page-manager.js';

import './template-functions.js';
import initApi, {clearAuth} from './api.js';
import login from './pages/login.js';
import signup from './pages/signup.js';
import settings from './pages/settings.js';

var loginUrl = 'login';

function loginPage() {
  var path = setjs.route().path;
  if (loginUrl != path) {
    setjs.setRoute(loginUrl + '?url=' + path);
  }
}

export default function(success) {
  pageLoader.setLoginManager({
    login: loginPage,
    handleAuthError: function() {
      clearAuth();
      setjs.setRoute(loginUrl);
    },
  });
  addPage('login', login);
  addPage('signup', signup);
  addPage('settings', settings);
  initApi(success);
}
