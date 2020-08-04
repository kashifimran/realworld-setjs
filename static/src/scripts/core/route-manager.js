import eventManager from 'setbp/kernel/event-manager.js';
import pageLoader from 'setbp/kernel/page-loader.js';
import {defData} from 'core/app-data.js';

export default function handleRoute(route) {
  defData['@route'] = route;
  eventManager.route(route);
  pageLoader.handleRoute(route);
}
