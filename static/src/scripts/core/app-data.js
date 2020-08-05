import eventManager, {eventTypes} from 'setbp/kernel/event-manager.js';
import {api} from 'core/api-helper.js';

export let appData = {};
export let defData = {};

eventManager.addListener(eventTypes.user, {id: 'data', priority: 1}, function(user) {
  defData['@user'] = appData.user = user;
});

eventManager.addListener(eventTypes.lang, {id: 'data', priority: 1}, function(langData) {
  defData['@lang'] = appData.lang = langData;
});

export function initAppData({success, error}) {
  api.getTags({
    error,
    success: function({tags}) {
      defData['@tags'] = appData.tags = tags;
      success();
    }
  });
}
