suite('Polymer.AppLayout.registerEffect', function() {

      test('should register the effects', function() {

        Polymer.AppLayout.registerEffect('test', {
          setUp: Function(),
          run: Function(),
          tearDown: Function()
        });

        assert.isFunction(Polymer.AppLayout._scrollEffects.test.setUp);
        assert.isFunction(Polymer.AppLayout._scrollEffects.test.run);
        assert.isFunction(Polymer.AppLayout._scrollEffects.test.tearDown);

      });

    });