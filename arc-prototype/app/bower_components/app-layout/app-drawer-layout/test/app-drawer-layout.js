HTMLImports.whenReady(function() {
      Polymer({
        is: 'x-resizeable',
        behaviors: [
          Polymer.IronResizableBehavior
        ]
      });
    });
suite('basic features', function() {
      var drawerLayout, drawer;

      setup(function() {
        drawerLayout = fixture('testDrawerLayout');
        drawer = drawerLayout.querySelector('app-drawer');
      });

      test('default values', function() {
        assert.isFalse(drawerLayout.forceNarrow);
        assert.equal(drawerLayout.responsiveWidth, '640px');
      });

      test('get drawer', function() {
        assert.equal(drawerLayout.drawer, drawer);
      });

      test('forceNarrow', function() {
        drawerLayout.responsiveWidth = '0px';
        drawerLayout.forceNarrow = true;

        assert.isTrue(drawerLayout.narrow);
      });

      test('responsiveWidth', function(done) {
        var drawerToggle = drawerLayout.querySelector('[drawer-toggle]');
        drawerLayout.responsiveWidth = '0px';

        window.setTimeout(function() {
          assert.isFalse(drawerLayout.narrow);
          assert.equal(window.getComputedStyle(drawerToggle)['display'], 'none');

          drawerLayout.responsiveWidth = '10000px';

          window.setTimeout(function() {
            assert.isTrue(drawerLayout.narrow);
            assert.notEqual(window.getComputedStyle(drawerToggle)['display'], 'none');

            done();
          }, 50);
        }, 50);
      });

      test('drawer-toggle', function() {
        drawerLayout.responsiveWidth = '10000px';

        assert.isFalse(drawer.opened);

        Polymer.Base.fire('tap', null /* detail */, { node: drawerLayout.querySelector('p') });

        assert.isFalse(drawer.opened);

        Polymer.Base.fire('tap', null /* detail */, { node: drawerLayout.querySelector('[drawer-toggle]') });

        assert.isTrue(drawer.opened);
      });

      test('content layout', function(done) {
        var listenerSpy = sinon.spy();
        var xResizeable = drawerLayout.querySelector('x-resizeable');
        xResizeable.addEventListener('iron-resize', listenerSpy);
        drawerLayout.responsiveWidth = '10000px';

        window.setTimeout(function() {
          assert.equal(drawerLayout.$.contentContainer.style.marginLeft, '');
          assert.equal(drawerLayout.$.contentContainer.style.marginRight, '');
          assert.isTrue(listenerSpy.called);
          listenerSpy.reset();

          drawerLayout.responsiveWidth = '0px';

          window.setTimeout(function() {
            assert.equal(drawerLayout.$.contentContainer.style.marginLeft, '256px');
            assert.equal(drawerLayout.$.contentContainer.style.marginRight, '');
            assert.isTrue(listenerSpy.called);
            listenerSpy.reset();

            drawer.align = 'end';

            window.setTimeout(function() {
              assert.equal(drawerLayout.$.contentContainer.style.marginLeft, '');
              assert.equal(drawerLayout.$.contentContainer.style.marginRight, '256px');
              assert.isTrue(listenerSpy.called);

              done();
            }, 50);
          }, 50);
        }, 50);
      });
    });