import eventManager from 'setbp/kernel/event-manager.js';
import pageLoader from 'setbp/kernel/page-loader.js';

export default function handleRoute(route) {
  eventManager.route(route);
  pageLoader.handleRoute(route);
}
