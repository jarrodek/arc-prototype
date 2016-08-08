function ensureDocumentHasFocus() {
      window.top && window.top.focus();
    }

    suite('focus', function() {
      var drawer, innerLink, outerLink;

      setup(function() {
        drawer = fixture('drawer');
        innerLink = drawer.querySelector('#innerLink1');
        outerLink = drawer.querySelector('#outerLink');
        ensureDocumentHasFocus();
      });

      test('should not focus content in drawer if the drawer is closed', function(done) {
        Polymer.Base.async(function() {
          expect(Polymer.dom(document).activeElement).to.not.be.equal(innerLink);
          done();
        }, 1);
        MockInteractions.focus(innerLink);
      });

    });

    suite('nested drawers', function() {
      var drawer1, drawer2, innerLink1, innerLink2;

      setup(function() {
        drawer1 = fixture('nestedDrawer');
        drawer2 = drawer1.querySelector('#drawer2');
        innerLink1 = drawer1.querySelector('#innerLink1');
        innerLink2 = drawer1.querySelector('#innerLink2');
        ensureDocumentHasFocus();
      });

      test('should not cause stack overflow', function(done) {
        var count = 0;
        var spy = sinon.spy();
        drawer1.openDrawer();
        drawer2.openDrawer();

        document.addEventListener('focus', spy, true);

        MockInteractions.focus(innerLink1);
        MockInteractions.focus(innerLink2);

        Polymer.Base.async(function() {
          if (spy.callCount > 10) {
            throw new Error('stack overflow');
          }
          done();
        }, 100);
      });

    });