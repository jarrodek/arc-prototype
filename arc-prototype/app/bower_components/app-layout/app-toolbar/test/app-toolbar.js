suite('basic features', function() {
      var toolbar;

      setup(function() {
        toolbar = fixture('trivialToolbar');
      });

      test('Items', function() {
        var barHeight = toolbar.offsetHeight;
        var topItem = document.elementFromPoint(0, 0);
        var title = Polymer.dom(toolbar).querySelector('[title]');
        var titleRect = title.getBoundingClientRect();
        var barRect = toolbar.getBoundingClientRect();
        var bottomItem = document.elementFromPoint(0, barHeight-1);

        assert.isTrue(topItem.hasAttribute('top-item'));
        assert.isTrue(bottomItem.hasAttribute('bottom-item'));
        assert.isTrue(titleRect.top > 0 && barRect.bottom - titleRect.bottom > 0);
      });

    });