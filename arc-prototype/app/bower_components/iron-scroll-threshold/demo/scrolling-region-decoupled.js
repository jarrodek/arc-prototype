(function(scope) {
        scope.loadMoreData = function() {
          // Simulate network delay
          setTimeout(function() {
            scope.size = +scope.size + 5;
            scope.$.scrollThreshold.clearTriggers();
          }, 500);
        };
      })(document.querySelector('#overlay'));