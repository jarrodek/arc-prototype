suite('basic features', function() {
      var headerLayout, header, toolbar;

      setup(function() {
        headerLayout = fixture('trivialHeader');
        header = headerLayout.querySelector('app-header');
        toolbar = headerLayout.querySelector('app-toolbar');
      });

      test('default values', function() {
        assert.isFalse(headerLayout.hasScrollingRegion);
        assert.equal(header.scrollTarget, document.documentElement);
      });

      test('scrolling region', function() {
        headerLayout.hasScrollingRegion = true;
        assert.isTrue(header.scrollTarget !== document.documentElement, 'scroller should not point to the document element');
      });

      test('header box size', function(done) {
        headerLayout.hasScrollingRegion = false;

        flush(function() {
          assert.equal(headerLayout.offsetWidth, header.offsetWidth,
              'should have the same width of app-header-layout');

          headerLayout.style.width = '200px';

          headerLayout.resetLayout();

          flush(function() {
            assert.equal(headerLayout.offsetWidth, header.offsetWidth,
              'should have the same width of app-header-layout even after setting a width');
            done();
          });

        });

      });

    });