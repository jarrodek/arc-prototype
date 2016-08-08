suite('basic features', function() {
      var container;

      setup(function() {
        container = fixture('testHeader');
      });

      test('effect outputs', function(done) {
        flush(function() {
          container._updateScrollState(0);

          assert.isTrue(sameCSS(container.$.title,
              'will-change: opacity; transform: translate(0px, 0px) scale3d(1, 1, 1); opacity: 1;'),
              'title when progress = 0');

          assert.isTrue(sameCSS(container.$.condensedTitle,
            'will-change: opacity; transform: translateZ(0px); opacity: 0;'),
            'condensed-title when progress = 0');

          container._updateScrollState(container.offsetHeight * 0.5);

          assert.isTrue(sameCSS(container.$.title,
              'will-change: opacity; transform: translate(50px, 50px) scale3d(1.5, 1.5, 1); opacity: 1;'),
              'title when progress = 0.5');

          assert.isTrue(sameCSS(container.$.condensedTitle,
            'will-change: opacity; transform: translateZ(0px); opacity: 0;'),
            'condensed-title when progress = 0.5');

          container._updateScrollState(container.offsetHeight);

          assert.isTrue(sameCSS(container.$.title,
            'will-change: opacity; transform: translate(100px, 100px) scale3d(2, 2, 1); opacity: 0;'),
            'title when progress = 1');

          assert.isTrue(sameCSS(container.$.condensedTitle,
            'will-change: opacity; transform: translateZ(0px); opacity: 1;'),
            'condensed-title when progress = 1');

          done();
        });
      });

    });