(function(scope) {

      scope.toggleDrawer = function() {
        scope.$.drawer.toggle();
      };

      var icons = ['inbox', 'favorite', 'polymer', 'question-answer', 'send', 'archive', 'backup', 'dashboard'];
      scope.items = icons.concat(icons).concat(icons);

    })(document.querySelector('template[is=dom-bind]'));