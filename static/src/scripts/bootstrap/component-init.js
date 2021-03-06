import eventManager, {eventTypes} from 'setbp/kernel/event-manager.js';

import footerInit from 'components/footer.js';
import navInit from 'components/navigation.js';

eventManager.addListener(eventTypes.init, 'comp-init', function() {
  footerInit();
  navInit();
});
