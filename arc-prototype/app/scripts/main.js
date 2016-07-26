(function(scope) {
  // Current screen
  scope.currentScreen = 'request';
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
})(document.querySelector('#app'));
