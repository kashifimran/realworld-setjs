import setjs from '@stateempire/setjs';
import eventManager, {eventTypes} from 'setbp/kernel/event-manager.js';

export default function() {
  var comp = setjs.getComp('common/navigation');
  var $pageLinks = comp.$root.find('a');
  $('#nav-placeholder').replaceWith(comp.$root);
  updateNav();
  eventManager.addListener(eventTypes.user, 'nav', comp.update, null);
  eventManager.addListener(eventTypes.route, 'nav', updateNav);

  function updateNav() {
    var path = setjs.route().path || '/';
    $pageLinks.removeClass('active');
    $pageLinks.filter('[data-href="' + path + '"]').addClass('active');
  }
}
