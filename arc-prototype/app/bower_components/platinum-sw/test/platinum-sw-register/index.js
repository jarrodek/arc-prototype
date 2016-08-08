var sw = document.querySelector('platinum-sw-register');

      suite('Registration & Installation', function() {
        test('creates an active service worker', function() {
          return window._controlledPromise.then(function(registration) {
            assert.ok(registration.active);
          });
        });

        test('state is set to "installed"', function() {
          assert.equal(sw.state, 'installed');
        });
      });