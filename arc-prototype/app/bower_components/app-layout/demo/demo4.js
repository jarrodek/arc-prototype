(function(scope) {

      scope.iconForItem = function(item) {
        return item ? (item.integer < 50 ? 'star-border' : 'star') : '';
      };

    })(document.querySelector('template[is=dom-bind]'));