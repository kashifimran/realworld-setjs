import setjs from '@stateempire/setjs';
import eventManager, {eventTypes} from 'setbp/kernel/event-manager.js';

/**
* Initializes the footer
*/
export default function(route) {
  var comp = setjs.getComp('common/navigation');
  var $pageLinks = comp.$root.find('a');
  $('#nav-placeholder').replaceWith(comp.$root);
  updateNav(route);
  eventManager.addListener(eventTypes.user, 'nav', updateNav);
  eventManager.addListener(eventTypes.route, 'nav', updateNav);

  function updateNav({path}) {
    path = path || '/';
    $pageLinks.removeClass('active');
    $pageLinks.filter('[data-href="' + path + '"]').addClass('active');
    console.log(path);
  }
}
