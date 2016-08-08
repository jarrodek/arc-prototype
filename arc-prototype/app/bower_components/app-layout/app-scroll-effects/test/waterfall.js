suite('basic features', function() {
      var container;

      setup(function() {
        container = fixture('testHeader');
      });

      test('show waterfall when needed', function(done) {
        flush(function() {
          container._updateScrollState(0);
          assert.isFalse(container.hasAttribute('shadow'));
          container.isOnScreen = function() { return true; };

          container._updateScrollState(0);
          assert.isFalse(container.hasAttribute('shadow'));
          container.isContentBelow = function() { return true; };

          container._updateScrollState(0);
          assert.isTrue(container.hasAttribute('shadow'));
          container.isOnScreen = function() { return false; };

          container._updateScrollState(0);
          assert.isFalse(container.hasAttribute('shadow'));
          container.isContentBelow = function() { return false; };

          container._updateScrollState(0);
          assert.isFalse(container.hasAttribute('shadow'));
          done();
        });
      });

    });