suite('Importing Service Worker Scripts', function() {
        test('message handler is registered via imported script', function(done) {
          return window._controlledPromise.then(function(registration) {
            var message = 'hello';
            var messageChannel = new MessageChannel();
            messageChannel.port1.onmessage = function(event) {
              assert.equal(event.data, message);
              done();
            };
            registration.active.postMessage(message, [messageChannel.port2]);
          });
        });
      });