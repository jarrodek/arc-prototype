(function(scope) {
      var items = [];
      var icons = ['inbox', 'favorite', 'polymer', 'question-answer', 'send', 'archive', 'backup', 'dashboard'];

      while (items.length < 100) {
        items.push('Option Name');
      }

      scope._randomIcon = function() {
        return icons[parseInt(icons.length * Math.random())];
      };

      scope.items = items;

    })(document.querySelector('template[is=dom-bind]'));