(function(scope) {
  // Current screen
  scope.currentScreen = 'request';
  // scope.currentScreen = 'projectview';
  scope.raml = {};
  scope.urlPanelOpened = false;
  /**
   * Navigation support.
   * The detail of the event must contain a 'screen' property with the screen name to display.
   */
  scope.addEventListener('navigate', (e) => {
    var d = e.detail;
    if (!d.screen) {
      return;
    }
    scope.currentScreen = d.screen;
  });

  // Initialize data
  fetch('scripts/mock-raml.json').then((r) => {
    r.json().then((data) => {
      scope.raml = data;
    });
  });

  document.body.addEventListener('navigate', (e) => {
    var data = e.detail;
    var screen = '';
    switch (data.section) {
      case 'raml':
        if (data.action === 'view') {
          screen = 'projectview';
        } else if (data.action === 'create') {
          screen = 'projectadd';
        } else if (data.action === 'edit') {
          screen = 'projectadd';
        }
      break;
    }
    scope.currentScreen = screen;
    scope.urlPanelOpened = false;
  });

  scope._computeToolbarIcon = (urlPanelOpened) => {
    return urlPanelOpened ? 'arrow-back' : 'menu';
  };

  scope.mainToolbarTriggerClick = () => {
    if (scope.urlPanelOpened) {
      scope.urlPanelOpened = false;
    } else {
      scope.$.drawer.togglePanel();
    }
  };
})(document.querySelector('#app'));
