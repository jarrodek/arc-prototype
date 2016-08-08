suite('MockInteractions', function() {
      var button;

      setup(function() {
        button = fixture('TrivialButton');
      });

      teardown(function(done) {
        // TODO(cdata): Remove when polymer/polymer#3540 is resolved
        window.setTimeout(function() {
          done();
        }, 2500);
      });

      suite('simulating tap', function() {
        test('only dispatches one tap event', function() {
          var tapSpy = sinon.spy();
          button.addEventListener('tap', tapSpy);
          MockInteractions.tap(button);
          button.removeEventListener('tap', tapSpy);
          expect(tapSpy.callCount).to.be.eql(1);
        });

        suite('with touch emulation', function() {
          test('only dispatches one tap event', function() {
            var tapSpy = sinon.spy();
            button.addEventListener('tap', tapSpy);
            MockInteractions.tap(button, { emulateTouch: true });
            button.removeEventListener('tap', tapSpy);
            expect(tapSpy.callCount).to.be.eql(1);
          });
        });
      });

      suite('simulating down and up', function() {
        test('only dispatches one tap event', function(done) {
          var tapSpy = sinon.spy();
          button.addEventListener('tap', tapSpy);
          MockInteractions.downAndUp(button, function() {
            button.removeEventListener('tap', tapSpy);
            expect(tapSpy.callCount).to.be.eql(1);
            done();
          });
        });

        suite('with touch emulation', function() {
          test('only dispatches one tap event', function(done) {
            var tapSpy = sinon.spy();
            button.addEventListener('tap', tapSpy);
            MockInteractions.downAndUp(button, function() {
              button.removeEventListener('tap', tapSpy);
              expect(tapSpy.callCount).to.be.eql(1);
              done();
            }, { emulateTouch: true });
          });
        });
      });
    });