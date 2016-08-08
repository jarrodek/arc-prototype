suite('basic features', function() {
      var scrollposControl;

      setup(function() {
        scrollposControl = fixture('basicScrollposControl')[0];
      });

      test('default settings', function() {
        assert.isFalse(scrollposControl.reset);
      });

      test('store and retrieve', function(done) {
        // page0 selected
        scrollposControl.selected = 'page0';
        assert.equal(window.pageYOffset, 0);
        // scroll down to 200px on page0
        window.scrollTo(0, 200);
        // change to page1
        scrollposControl.selected = 'page1';
        setTimeout(function() {
          assert.equal(window.pageYOffset, 0, 'should be reset to 0');
          // change it back to page0
          scrollposControl.selected = 'page0';
          setTimeout(function() {
            assert.equal(window.pageYOffset, 200, 'should update to previous scrollpos on page0');
            done();
          }, 50);
        }, 10);
      });

    });