import setjs from '@stateempire/setjs';
import router from 'Router';
import {defData} from 'core/app-data.js';
import handleRoute from 'core/route-manager.js';
import langHelper from 'setbp/kernel/lang-helper.js';

var lastLinkClick = 0;

function fixPath(pathStr) {
  return pathStr.replace(/\/{2,}/g, '/').replace(/(.+)\/$/, '$1');
}

function getLink(subRoute) {
  let lang = langHelper.lang();
  return fixPath('/' + (lang ? lang + '/' : '')  + (subRoute || ''));
}

function compUpdate($selection) {
  $selection.find('[data-href]').addBack('[data-href]').each(function(i, el) {
    var $link = $(el);
    var dHref = $link.attr('data-href');
    if ($link.data('dHref') != dHref && !$link.closest('[data-no-links]').length) {
      if ($link.attr('target') != '_blank') {
        $link.off('.hr').on('click.hr', function(e) {
          if (!e.metaKey) {
            e.preventDefault();
            if (Date.now() - lastLinkClick > 900) {
              setjs.setRoute(dHref);
              lastLinkClick = Date.now();
            }
          }
        });
      }
      $link.data('dHref', dHref).attr('href', getLink(dHref));
    }
  });
}

export default function() {
  setjs.init({
    router,
    defData,
    handleRoute,
    fixPath,
    getLink,
    compUpdate,
    lang: langHelper.lang,
  });
}
