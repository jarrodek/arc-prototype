suite('basic features', function() {
      var container;

      setup(function() {
        container = fixture('testHeader');
      });

      test('effect outputs', function(done) {
        flush(function() {
          container._updateScrollState(0);

          assert.isTrue(sameCSS(container.$.backgroundFrontLayer,
              'will-change: opacity; transition-property: opacity; ' +
              'transition-duration: 0.5s;'),
              'backgroundFrontLayer when progress = 0');

          assert.isTrue(sameCSS(container.$.backgroundRearLayer,
              'will-change: opacity; transition-property: opacity;' +
              'transition-duration: 0.5s;'),
              'backgroundRearLayer when progress = 0');

          container.$.backgroundFrontLayer.style.transition = 'none';
          container.$.backgroundRearLayer.style.transition = 'none';

          assert.isTrue(sameCSS(container.$.backgroundFrontLayer, 'opacity: 1'),
              'backgroundFrontLayer when progress = 0');

          assert.isTrue(sameCSS(container.$.backgroundRearLayer, 'opacity: 0'),
              'backgroundRearLayer when progress = 0');

          container._updateScrollState(container.offsetHeight);

          assert.isTrue(sameCSS(container.$.backgroundFrontLayer, 'opacity: 0'),
              'backgroundFrontLayer when progress = 1');

          assert.isTrue(sameCSS(container.$.backgroundRearLayer, 'opacity: 1'),
              'backgroundRearLayer when progress = 1');

          done();
        });
      });

    });