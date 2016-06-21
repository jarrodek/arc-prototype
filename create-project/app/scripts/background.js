'use strict';

/**
 * Advanced Rest Client namespace.
 *
 * @namespace
 */
var arc = arc || {};
/**
 * ARC background page namespace.
 *
 * @namespace
 */
arc.bg = arc.bg || {};
/**
 * Open new window of the app.
 * Every call will open new window even if another window is already created.
 */
arc.bg.openWindow = (url) => {
  if (!url) {
    url = 'index.html';
  }
  var all = chrome.app.window.getAll();
  var length = all.length;
  var id = 'arc-window-' + length;
  chrome.app.window.create(
    url, {
      id: id,
      bounds: {
        width: 1200,
        height: 800
      }
    }
  );
};
/**
 * Handler for `onLaunched` event.
 * Depending on launch data it will open window in default view or requested view.
 */
arc.bg.onLaunched = (lunchData) => {
  var url = 'index.html';
  if (lunchData && lunchData.id) {
    switch (lunchData.id) {
      case 'google_drive_open':
        let _url = lunchData.url;
        _url = _url.substr(_url.indexOf('state') + 6);
        let data = JSON.parse(decodeURIComponent(_url));
        let id = data.ids[0];
        url += '#!/request/drive/' + id;
        break;
    }
  }
  arc.bg.openWindow(url);
};
chrome.app.runtime.onLaunched.addListener(arc.bg.onLaunched);
