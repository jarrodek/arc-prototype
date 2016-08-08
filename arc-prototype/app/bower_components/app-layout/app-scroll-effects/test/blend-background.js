suite('basic features', function() {
      var container;

      setup(function() {
        container = fixture('testHeader');
      });

      test('effect outputs', function(done) {
        flush(function() {
          container._updateScrollState(0);

          assert.isTrue(sameCSS(container.$.backgroundFrontLayer,
              'will-change: opacity; transform: translateZ(0px); opacity: 1;'),
              'backgroundFrontLayer when progress = 0');

          assert.isTrue(sameCSS(container.$.backgroundRearLayer,
              'will-change: opacity; transform: translateZ(0px); opacity: 0;'),
              'backgroundRearLayer when progress = 0');

          container._updateScrollState(container.offsetHeight);

          assert.isTrue(sameCSS(container.$.backgroundFrontLayer,
              'will-change: opacity; transform: translateZ(0px); opacity: 0;'),
              'backgroundFrontLayer when progress = 1');

          assert.isTrue(sameCSS(container.$.backgroundRearLayer,
              'will-change: opacity; transform: translateZ(0px); opacity: 1;'),
              'backgroundRearLayer when progress = 1');

          done();
        });
      });

    });