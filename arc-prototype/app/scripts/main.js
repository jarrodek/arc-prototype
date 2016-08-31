(function(scope) {
  // Current screen
  // scope.currentScreen = 'request';
  scope.currentScreen = 'projectview';
  scope.raml = {};
  scope.selectedTab = 0;
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
})(document.querySelector('#app'));
