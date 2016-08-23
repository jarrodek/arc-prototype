suite('defaults', function() {
      var c1;

      setup(function() {
        c1 = fixture('NoLabel');
      });

      test('check checkbox via click', function(done) {
        c1.addEventListener('click', function() {
          assert.isTrue(c1.getAttribute('aria-checked') == 'true');
          assert.isTrue(c1.checked);
          done();
        });
        MockInteractions.tap(c1);
      });

      test('toggle checkbox via click', function(done) {
        c1.checked = true;
        c1.addEventListener('click', function() {
          assert.isFalse(c1.getAttribute('aria-checked') != 'false');
          assert.isFalse(c1.checked);
          done();
        });
        MockInteractions.tap(c1);
      });

      test('disabled checkbox cannot be clicked', function(done) {
        c1.disabled = true;
        c1.checked = true;
        MockInteractions.tap(c1);
        setTimeout(function() {
          assert.isTrue(c1.getAttribute('aria-checked') == 'true');
          assert.isTrue(c1.checked);
          done();
        }, 1);
      });

      test('checkbox can be validated', function() {
        c1.required = true;
        assert.isFalse(c1.validate());

        c1.checked = true;
        assert.isTrue(c1.validate());
      });

      test('disabled checkbox is always valid', function() {
        c1.disabled = true;
        c1.required = true;
        assert.isTrue(c1.validate());

        c1.checked = true;
        assert.isTrue(c1.validate());
      });

      test('checkbox can check sizes', function() {
        var c2 = fixture('WithDifferentSizes');
        var normal = c2[0].getBoundingClientRect();
        var giant = c2[1].getBoundingClientRect();
        var tiny = c2[2].getBoundingClientRect();

        assert.isTrue(5 === tiny.height);
        assert.isTrue(tiny.height < normal.height);
        assert.isTrue(normal.height < giant.height);
        assert.isTrue(giant.height <= 50);
        
        assert.isTrue(5 === tiny.width);
        assert.isTrue(tiny.width < normal.width);
        assert.isTrue(normal.width < giant.width);
        assert.isTrue(giant.width === 50);
      });

      suite('checkbox line-height', function() {
        var large;
        var small;

        setup(function() {
          var checkboxes = fixture('WithLineHeight');
          large = checkboxes[0];
          small = checkboxes[1];
        });

        test('checkboxes with >1 line-height have an equal height', function() {
          var largeRect = large.getBoundingClientRect();
          var largeStyle = getComputedStyle(large);

          assert.isTrue(largeRect.height === 3 * parseFloat(largeStyle.fontSize));
        });

        test('checkbox with <1 line-height are at least 1em tall', function() {
          var smallRect = small.getBoundingClientRect();
          var smallStyle = getComputedStyle(small);

          assert.isTrue(smallRect.height >= 1 * parseFloat(smallStyle.fontSize));
        });
      });

      suite('ink size', function() {
        var checkboxes;

        setup(function() {
          checkboxes = fixture('WithDifferentSizes2');
        });

        test('`--paper-checkbox-ink-size` sets the ink size', function() {
          var checkbox = fixture('CustomInkSize');
          assert.equal(checkbox.getComputedStyleValue('--calculated-paper-checkbox-size'), '25px');
          assert.equal(checkbox.getComputedStyleValue('--calculated-paper-checkbox-ink-size'), '30px');
        });

        test('ink sizes are near (8/3 * checkbox size) by default', function() {
          checkboxes.forEach(function(checkbox) {
            var size = parseFloat(checkbox.getComputedStyleValue('--calculated-paper-checkbox-size'), 10);
            var inkSize = parseFloat(checkbox.getComputedStyleValue('--calculated-paper-checkbox-ink-size'), 10);
            assert.approximately(inkSize / size, 8 / 3, 0.1);
          });
        });

        test('ink sizes are integers', function() {
          checkboxes.forEach(function(checkbox) {
            var unparsedInkSize = checkbox.getComputedStyleValue('--calculated-paper-checkbox-ink-size');
            var floatInkSize = parseFloat(unparsedInkSize, 10);
            var intInkSize = parseInt(unparsedInkSize, 10);
            assert.equal(floatInkSize, intInkSize);
          });
        });

        test('ink size parity matches checkbox size parity (centers are aligned)', function() {
          checkboxes.forEach(function(checkbox) {
            var size = parseInt(checkbox.getComputedStyleValue('--calculated-paper-checkbox-size'), 10);
            var inkSize = parseInt(checkbox.getComputedStyleValue('--calculated-paper-checkbox-ink-size'), 10);
            assert.equal(size % 2, inkSize % 2);
          });
        });
      });
    });

    suite('a11y', function() {
      var c1;
      var c2;

      setup(function() {
        c1 = fixture('NoLabel');
        c2 = fixture('WithLabel');
      });

      test('has aria role "checkbox"', function() {
        assert.isTrue(c1.getAttribute('role') == 'checkbox');
        assert.isTrue(c2.getAttribute('role') == 'checkbox');
      });

      test('checkbox with no label has no aria label', function() {
        assert.isTrue(!c1.getAttribute('aria-label'));
      });

      test('checkbox respects the user set aria-label', function() {
        var c = fixture('AriaLabel');
        assert.isTrue(c.getAttribute('aria-label') == "Batman");
      });

      a11ySuite('NoLabel');
      a11ySuite('WithLabel');
      a11ySuite('AriaLabel');
    });