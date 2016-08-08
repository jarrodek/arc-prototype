(function(scope) {
    scope.toggleLeft = function() {
      this.$.startDrawer.toggle();
    };

    scope.toggleRight = function() {
      this.$.endDrawer.toggle();
    };
  })(document.querySelector('#app'));