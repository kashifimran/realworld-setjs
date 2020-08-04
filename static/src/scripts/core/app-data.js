import eventManager, {eventTypes} from 'setbp/kernel/event-manager.js';

export let appData = {};
export let defData = {};

eventManager.addListener(eventTypes.user, {id: 'data', priority: 1}, function(user) {
  defData['@user'] = appData.user = user;
});

eventManager.addListener(eventTypes.lang, {id: 'data', priority: 1}, function(langData) {
  defData['@lang'] = appData.lang = langData;
});

export function initAppData(callbacks) {
  callbacks.success();
}
