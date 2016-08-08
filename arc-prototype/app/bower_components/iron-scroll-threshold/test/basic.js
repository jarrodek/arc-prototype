suite('basic features', function() {
      var scrollThreshold;

      setup(function() {
        scrollThreshold = fixture('trivialScrollThreshold');
      });

      teardown(function() {
        scrollThreshold.clearTriggers();
        scrollThreshold._scrollTop = 0;
      });

      test('default', function() {
        assert.equal(scrollThreshold._defaultScrollTarget, scrollThreshold, '_defaultScrollTarget');
        assert.equal(scrollThreshold.scrollTarget, scrollThreshold, 'scrollTarget');
        assert.equal(scrollThreshold.upperThreshold, 100, 'upperThreshold');
        assert.equal(scrollThreshold.lowerThreshold, 100, 'lowerThreshold');
        assert.equal(scrollThreshold.horizontal, false, 'horizontal');
        assert.equal(window.getComputedStyle(scrollThreshold.scrollTarget).overflow, 'auto', 'overflow');
      });

      test('upper-threshold event', function(done) {
        flush(function() {
          scrollThreshold.addEventListener('upper-threshold', function() {
            assert.isTrue(scrollThreshold.upperTriggered);
            done();
          });
          assert.isTrue(scrollThreshold.upperTriggered);

          scrollThreshold.clearTriggers();
          scrollThreshold._scrollTop = scrollThreshold._scrollTop + 1;
        });
      });

      test('lower-threshold event', function(done) {
        flush(function() {
          scrollThreshold.addEventListener('lower-threshold', function() {
            assert.isTrue(scrollThreshold.lowerTriggered);
            done();
          });
          scrollThreshold._scrollTop = scrollThreshold.scrollTarget.scrollHeight;
        });
      });

      test('clearTriggers', function(done) {
        flush(function() {
          assert.isTrue(scrollThreshold.upperTriggered);
          scrollThreshold.clearTriggers();
          assert.isFalse(scrollThreshold.upperTriggered);
          done();
        });
      });

      test('checkScrollThesholds', function(done) {
        flush(function() {
          scrollThreshold._scrollTop = scrollThreshold.scrollTarget.scrollHeight;

          assert.isFalse(scrollThreshold.lowerTriggered, 'check assumption');
          scrollThreshold.checkScrollThesholds();
          assert.isTrue(scrollThreshold.lowerTriggered, 'check triggers');
          scrollThreshold.clearTriggers();
          assert.isFalse(scrollThreshold.lowerTriggered, 'reset triggers');
          done();
        });
      });

      test('horizontal', function(done) {
        scrollThreshold.horizontal = true;
        flush(function() {
          scrollThreshold.clearTriggers();
          scrollThreshold._scrollLeft = scrollThreshold.scrollTarget.scrollWidth;

          assert.isFalse(scrollThreshold.lowerTriggered, 'check assumption');
          scrollThreshold.checkScrollThesholds();
          assert.isTrue(scrollThreshold.lowerTriggered, 'check lowerTriggered');
          scrollThreshold._scrollLeft = 0;
          scrollThreshold.checkScrollThesholds();
          assert.isTrue(scrollThreshold.upperTriggered, 'upperTriggered');
          done();
        });
      });
    });

    suite('document scroll', function() {
      var scrollThreshold;

      setup(function() {
        scrollThreshold = fixture('trivialDocumentScrolling');
      });

      teardown(function() {
        scrollThreshold.clearTriggers();
        scrollThreshold._scrollTop = 0;
      });

      test('default', function() {
        assert.equal(scrollThreshold.scrollTarget, scrollThreshold._doc, 'scrollTarget');
        assert.equal(scrollThreshold.upperThreshold, 100, 'upperThreshold');
        assert.equal(scrollThreshold.lowerThreshold, 100, 'lowerThreshold');
        assert.equal(scrollThreshold.horizontal, false, 'horizontal');
      });

      test('upper-threshold event', function(done) {
        flush(function() {
          scrollThreshold.addEventListener('upper-threshold', function() {
            assert.isTrue(scrollThreshold.upperTriggered);
            done();
          });
          assert.isTrue(scrollThreshold.upperTriggered);

          scrollThreshold.clearTriggers();
          scrollThreshold._scrollTop = scrollThreshold._scrollTop + 1;
        });
      });

      test('lower-threshold event', function(done) {
        flush(function() {
          scrollThreshold.addEventListener('lower-threshold', function() {
            assert.isTrue(scrollThreshold.lowerTriggered);
            done();
          });
          scrollThreshold._scrollTop = scrollThreshold.scrollTarget.scrollHeight;
        });
      });

      test('clearTriggers', function(done) {
        flush(function() {
          assert.isTrue(scrollThreshold.upperTriggered);
          scrollThreshold.clearTriggers();
          assert.isFalse(scrollThreshold.upperTriggered);
          done();
        });
      });

      test('checkScrollThesholds', function(done) {
        flush(function() {
          scrollThreshold._scrollTop = scrollThreshold.scrollTarget.scrollHeight;

          assert.isFalse(scrollThreshold.lowerTriggered, 'check assumption');
          scrollThreshold.checkScrollThesholds();
          assert.isTrue(scrollThreshold.lowerTriggered, 'check triggers');
          scrollThreshold.clearTriggers();
          assert.isFalse(scrollThreshold.lowerTriggered, 'reset triggers');
          done();
        });
      });

      test('horizontal', function(done) {
        scrollThreshold.horizontal = true;
        flush(function() {
          scrollThreshold.clearTriggers();
          scrollThreshold._scrollLeft = scrollThreshold.scrollTarget.scrollWidth;

          assert.isFalse(scrollThreshold.lowerTriggered, 'check assumption');
          scrollThreshold.checkScrollThesholds();
          assert.isTrue(scrollThreshold.lowerTriggered, 'check lowerTriggered');
          scrollThreshold._scrollLeft = 0;
          scrollThreshold.checkScrollThesholds();
          assert.isTrue(scrollThreshold.upperTriggered, 'upperTriggered');
          done();
        });
      });
    });