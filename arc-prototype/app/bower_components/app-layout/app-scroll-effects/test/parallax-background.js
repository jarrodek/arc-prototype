suite('basic features', function() {
      var container;

      setup(function() {
        container = fixture('testHeader');
      });

      test('effect outputs', function(done) {
        flush(function() {
          container._updateScrollState(0);

          assert.isTrue(sameCSS(container.$.backgroundFrontLayer,
              'transform: translate3d(0px, 0px, 0px);'), 'backgroundFrontLayer when progress = 0');

          assert.isTrue(sameCSS(container.$.backgroundRearLayer,
              'transform: translate3d(0px, 0px, 0px);'), 'backgroundRearLayer when progress = 0');

          container._updateScrollState(container.offsetHeight);

          assert.isTrue(sameCSS(container.$.backgroundFrontLayer,
              'transform: translate3d(0px, 200px, 0px);'), 'backgroundFrontLayer when progress = 1');

          assert.isTrue(sameCSS(container.$.backgroundRearLayer,
              'transform: translate3d(0px, 200px, 0px);'), 'backgroundRearLayer when progress = 1');
          done();
        });
      });

    });