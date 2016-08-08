if (navigator.serviceWorker) {
        WCT.loadSuites([
          // Keep each test suite in its own directory so that it gets a SW registered with a
          // limited scope, just in case the browser environment is not cleared in between each
          // test suite.
          'platinum-sw-register/index.html',
          'platinum-sw-cache/index.html',
          'platinum-sw-import-script/index.html',
          'platinum-sw-fetch/index.html',
          'platinum-sw-register/index.html?dom=shadow',
          'platinum-sw-cache/index.html?dom=shadow',
          'platinum-sw-import-script/index.html?dom=shadow',
          'platinum-sw-fetch/index.html?dom=shadow'
        ]);
      } else {
        WCT.loadSuites([
          'platinum-sw-unsupported.html',
          'platinum-sw-unsupported.html?dom=shadow'
        ]);
      };