function scrollTestHelper(scroller, tests) {

      function scrollEventHandler() {
        var nextTest = tests.shift();
        if (nextTest) {
          nextTest.callback();
          if (tests.length > 0) triggerScrollEvent();
        }
      }

      function triggerScrollEvent() {
        var scrollTop = scroller === document.documentElement ? window.pageYOffset : scroller.scrollTop;
        if (tests[0].y === scrollTop) {
          // Scrolling to the same position won't trigger a scroll event,
          // so just call the scroll event handler.
          scrollEventHandler();
        } else {
          if (scroller === document.documentElement) window.scrollTo(0, tests[0].y);
          else scroller.scrollTop = tests[0].y;
        }
      }

      if (tests.length > 0) {
        var scrollTarget = scroller === document.documentElement ? window : scroller;
        scrollTarget.addEventListener('scroll', scrollEventHandler);
        triggerScrollEvent();
      }
    }

    function assertHeaderIsFullSized(header) {
      var headerClientRect = header.getBoundingClientRect();
      assert.equal(headerClientRect.top, 0);
      assert.equal(headerClientRect.bottom, headerClientRect.height);
    }

    function assertHeaderIsCondensed(header) {
      var headerClientRect = header.getBoundingClientRect();
      assert.equal(headerClientRect.top + headerClientRect.height, header._primaryEl.offsetHeight);
    }

    function assertHeaderIsHidden(header) {
      var headerClientRect = header.getBoundingClientRect();
      assert.isBelow(headerClientRect.bottom, 0);
    }

    suite('basic features', function() {
      var container, header, toolbar, testEffect;

      suiteSetup(function() {
        testEffect = {
          setUp: sinon.spy(),
          tearDown: sinon.spy(),
          run: sinon.spy()
        };
        Polymer.AppLayout.registerEffect('test-effect', testEffect);
      });

      setup(function() {
        container = fixture('testHeader');
        header = container.querySelector('app-header');
        toolbar = container.querySelector('app-toolbar');

        testEffect.setUp.reset();
        testEffect.tearDown.reset();
        testEffect.run.reset();
      });

      test('default values', function() {
        assert.isFalse(header.condenses);
        assert.isFalse(header.fixed);
        assert.isFalse(header.reveals);
        assert.isFalse(header.shadow);
      });

      test('condenses', function(done) {
        header.condenses = true;

        flush(function() {
          scrollTestHelper(header.scrollTarget, [
            {
              y: 0,
              callback: function() {
                assertHeaderIsFullSized(header);
              }
            }, {
              y: toolbar.offsetHeight,
              callback: function() {
                assertHeaderIsCondensed(header);
              }
            }, {
              y: toolbar.offsetHeight * 10,
              callback: function() {
                assertHeaderIsHidden(header);
              }
            }, {
              y: toolbar.offsetHeight * 5,
              callback: function() {
                assertHeaderIsHidden(header);
              }
            }, {
              y: 0,
              callback: function() {
                assertHeaderIsFullSized(header);
                done();
              }
            }
          ]);
        });
      });

      test('fixed', function(done) {
        header.fixed = true;

        flush(function() {
          scrollTestHelper(header.scrollTarget, [
            {
              y: 0,
              callback: function() {
                assertHeaderIsFullSized(header);
              }
            }, {
              y: toolbar.offsetHeight * 10,
              callback: function() {
                assertHeaderIsFullSized(header);
                done();
              }
            }
          ]);
        });
      });

      test('reveals', function(done) {
        header.reveals = true;

        flush(function() {
          scrollTestHelper(header.scrollTarget, [
            {
              y: 0,
              callback: function() {
                assertHeaderIsFullSized(header);
              }
            }, {
              y: toolbar.offsetHeight * 10,
              callback: function() {
                assertHeaderIsHidden(header);
              }
            }, {
              y: toolbar.offsetHeight * 5,
              callback: function() {
                assertHeaderIsFullSized(header);
                done();
              }
            }
          ]);
        });
      });

      test('condenses and reveals', function(done) {
        header.condenses = true;
        header.reveals = true;

        flush(function() {
          scrollTestHelper(header.scrollTarget, [
            {
              y: 0,
              callback: function() {
                assertHeaderIsFullSized(header);
              }
            }, {
              y: toolbar.offsetHeight,
              callback: function() {
                assertHeaderIsCondensed(header);
              }
            }, {
              y: toolbar.offsetHeight * 10,
              callback: function() {
                assertHeaderIsHidden(header);
              }
            }, {
              y: toolbar.offsetHeight * 5,
              callback: function() {
                assertHeaderIsCondensed(header);
              }
            }, {
              y: 0,
              callback: function() {
                assertHeaderIsFullSized(header);
                done();
              }
            }
          ]);
        });
      });

      test('condenses and fixed', function(done) {
        header.condenses = true;
        header.fixed = true;

        flush(function() {
          scrollTestHelper(header.scrollTarget, [
            {
              y: 0,
              callback: function() {
                assertHeaderIsFullSized(header);
              }
            }, {
              y: toolbar.offsetHeight,
              callback: function() {
                assertHeaderIsCondensed(header);
              }
            }, {
              y: toolbar.offsetHeight * 10,
              callback: function() {
                assertHeaderIsCondensed(header);
                done();
              }
            }
          ]);
        });
      });

      test('simple effect', function(done) {
        header.effects = 'test-effect';

        flush(function() {
          scrollTestHelper(header.scrollTarget, [
            {
              y: 0,
              callback: function() {
                assert.isTrue(testEffect.setUp.called);
                assert.deepEqual(testEffect.run.lastCall.args, [0, 0]);
              }
            }, {
              y: toolbar.offsetHeight,
              callback: function() {
                assert.deepEqual(testEffect.run.lastCall.args, [1, 64]);
              }
            }, {
              y: toolbar.offsetHeight * 2,
              callback: function() {
                assert.deepEqual(testEffect.run.lastCall.args, [2, 128]);
              }
            }, {
              y: toolbar.offsetHeight * 3,
              callback: function() {
                assert.deepEqual(testEffect.run.lastCall.args, [2.078125, 133]);
              }
            }, {
              y: toolbar.offsetHeight * 4,
              callback: function() {
                assert.deepEqual(testEffect.run.lastCall.args, [2.078125, 133]);

                header.effects = '';

                assert.isTrue(testEffect.tearDown.called);
                done();
              }
            }
          ]);
        });
      });

      test('effect with config', function(done) {
        var testEffectConfig = {
          startsAt: 0.5,
          endsAt: 0.75
        };

        header.effects = 'test-effect';
        header.effectsConfig = {
          'test-effect': testEffectConfig
        };

        flush(function() {
          scrollTestHelper(header.scrollTarget, [
            {
              y: 0,
              callback: function() {
                assert.isTrue(testEffect.setUp.called);
                assert.deepEqual(testEffect.setUp.lastCall.args, [testEffectConfig]);
                assert.deepEqual(testEffect.run.lastCall.args, [0, 0]);
              }
            }, {
              y: 32,
              callback: function() {
                assert.deepEqual(testEffect.run.lastCall.args, [0, 32]);
              }
            }, {
              y: 40,
              callback: function() {
                assert.deepEqual(testEffect.run.lastCall.args, [0.5, 40]);
              }
            }, {
              y: 48,
              callback: function() {
                assert.deepEqual(testEffect.run.lastCall.args, [1, 48]);
              }
            }, {
              y: toolbar.offsetHeight,
              callback: function() {
                assert.deepEqual(testEffect.run.lastCall.args, [2, 64]);

                header.effects = '';

                assert.isTrue(testEffect.tearDown.called);
                done();
              }
            }
          ]);
        });
      });

      test('disabled state', function(done) {
        header.effects = 'test-effect';

        flush(function() {
          scrollTestHelper(header.scrollTarget, [
            {
              y: 0,
              callback: function() {
                assert.isTrue(testEffect.setUp.called);
                assert.deepEqual(testEffect.run.lastCall.args, [0, 0]);

                header.disabled = true;
              }
            }, {
              y: toolbar.offsetHeight,
              callback: function() {
                assert.deepEqual(testEffect.run.lastCall.args, [0, 0]);

                header.disabled = false;
              }
            }, {
              y: toolbar.offsetHeight * 2,
              callback: function() {
                assert.deepEqual(testEffect.run.lastCall.args, [2, 128]);

                done();
              }
            }
          ]);
        });
      });

      test('isOnScreen', function(done) {
        flush(function() {
          scrollTestHelper(header.scrollTarget, [
            {
              y: 0,
              callback: function() {
                assert.isTrue(header.isOnScreen());
              }
            }, {
              y: toolbar.offsetHeight,
              callback: function() {
                assert.isTrue(header.isOnScreen());
              }
            }, {
              y: toolbar.offsetHeight * 2,
              callback: function() {
                assert.isFalse(header.isOnScreen());
                header.fixed = true;
              }
            }, {
              y: toolbar.offsetHeight * 3,
              callback: function() {
                assert.isTrue(header.isOnScreen());
                done();
              }
            }
          ]);
        });
      });

      test('DOM references', function(done) {
        flush(function() {
           assert.isNotNull(header._getDOMRef('backgroundFrontLayer'));
           assert.isNotNull(header._getDOMRef('backgroundRearLayer'));
           assert.isNotNull(header._getDOMRef('title'));
           assert.isNotNull(header._getDOMRef('condensedTitle'));
           done();
        });
      });
    });

    suite('Primary element', function() {
      var container, header;

      setup(function() {
        container = fixture('testPrimaryElement');
        header = container.querySelector('app-header');
      });

      test('primary element reference', function() {
        assert.equal(header._getPrimaryEl(), header.querySelector('[primary]'));
      });

      test('should reveal the entire header', function(done) {
        flush(function() {
          scrollTestHelper(header.scrollTarget, [
            {
              y: 0,
              callback: function() {
                assertHeaderIsFullSized(header);
              }
            }, {
              y: 1000,
              callback: function() {
                assertHeaderIsCondensed(header);
              }
            }, {
              y: 980,
              callback: function() {
                setTimeout(function() {
                  assertHeaderIsFullSized(header);
                  done();
                }, 100);
              }
            } 
          ]);
        });
      });
    });