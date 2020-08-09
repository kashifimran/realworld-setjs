import eventManager, {eventTypes} from 'setbp/kernel/event-manager.js';
import {api} from 'core/api-helper.js';

export let defData = {};

['init', 'route', 'user', 'lang'].forEach(function(name) {
  eventManager.addListener(eventTypes[name], {id: 'data', priority: 1}, function(data) {
    name = name == 'init' ? 'route' : name;
    defData['@' + name] = data;
  });
});

export default function({success, error}) {
  api.getTags({
    error,
    success: function({tags}) {
      defData['@tags'] = tags;
      success();
    }
  });
}
