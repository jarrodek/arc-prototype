suite('basic features', function() {
      var container;

      setup(function() {
        container = fixture('testHeader');
      });

      test('effect outputs', function(done) {
        flush(function() {
          container._updateScrollState(0);

          assert.isTrue(sameCSS(container.$.title,
              'transition-property: opacity; transition-duration: 0.2s; opacity: 1;'),
              'title when progress = 0');

          assert.isTrue(sameCSS(container.$.condensedTitle,
              'transition-property: opacity; transition-duration: 0.2s;'),
              'condensed-title when progress = 0');

          container.$.title.style.transition = 'none';
          container.$.condensedTitle.style.transition = 'none';

          assert.isTrue(sameCSS(container.$.condensedTitle, 'opacity: 0'),
              'condensed-title when progress = 0');

          container._updateScrollState(container.offsetHeight);

          assert.isTrue(sameCSS(container.$.title, 'opacity: 0;'), 'title when progress = 1');

          assert.isTrue(sameCSS(container.$.condensedTitle, 'opacity: 1;'),
              'condensed-title when progress = 1');

          done();
        });
      });

    });