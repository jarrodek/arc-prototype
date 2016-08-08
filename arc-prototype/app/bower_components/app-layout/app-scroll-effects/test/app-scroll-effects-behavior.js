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

    suite('basic features', function() {
      var container, testEffect;

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
        testEffect.setUp.reset();
        testEffect.tearDown.reset();
        testEffect.run.reset();
      });

      test('simple effect', function(done) {
        container.effects = 'test-effect';

        flush(function() {
          scrollTestHelper(container.scrollTarget, [
            {
              y: 0,
              callback: function() {
                assert.isTrue(testEffect.setUp.called);
                assert.deepEqual(testEffect.run.lastCall.args, [0, 0]);
              }
            }, {
              y: container.offsetHeight * 0.5,
              callback: function() {
                assert.deepEqual(testEffect.run.lastCall.args, [0.5, container.offsetHeight * 0.5]);
              }
            }, {
              y: container.offsetHeight,
              callback: function() {
                assert.deepEqual(testEffect.run.lastCall.args, [1, container.offsetHeight]);
              }
            }, {
              y: container.offsetHeight * 2,
              callback: function() {
                assert.deepEqual(testEffect.run.lastCall.args, [2, container.offsetHeight * 2]);
              }
            }, {
              y: container.offsetHeight * 3,
              callback: function() {
                assert.deepEqual(testEffect.run.lastCall.args, [3, container.offsetHeight * 3]);
                container.effects = '';
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
          endsAt: 1
        };

        container.effects = 'test-effect';
        container.effectsConfig = {
          'test-effect': testEffectConfig
        };

        flush(function() {
          scrollTestHelper(container.scrollTarget, [
            {
              y: 0,
              callback: function() {
                assert.isTrue(testEffect.setUp.called);
                assert.deepEqual(testEffect.setUp.lastCall.args, [testEffectConfig]);
                assert.deepEqual(testEffect.run.lastCall.args, [0, 0]);
              }
            }, {
              y: container.offsetHeight * 0.25,
              callback: function() {
                assert.deepEqual(testEffect.run.lastCall.args, [0, container.offsetHeight*0.25]);
              }
            }, {
              y: container.offsetHeight * 0.5,
              callback: function() {
                assert.deepEqual(testEffect.run.lastCall.args, [0, container.offsetHeight*0.5]);
              }
            }, {
              y: container.offsetHeight * 0.75,
              callback: function() {
                assert.deepEqual(testEffect.run.lastCall.args, [0.5, container.offsetHeight * 0.75]);
              }
            }, {
              y: container.offsetHeight,
              callback: function() {
                assert.deepEqual(testEffect.run.lastCall.args, [1, container.offsetHeight]);
                container.effects = '';
                assert.isTrue(testEffect.tearDown.called);
                done();
              }
            }
          ]);
        });
      });
    });