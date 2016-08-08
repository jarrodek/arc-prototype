suite('Polymer.AppLayout.scroll', function() {

      test('document scrolling', function(done) {
        var x = 500;
        var y = 500;
        var region = document.querySelector('#region');

        Polymer.AppLayout.scroll({left: x, top: y});

        Polymer.Base.async(function() {
          assert.equal(window.pageXOffset, x, 'document scrollLeft');
          assert.equal(window.pageYOffset, y, 'document scrollTop');
          done();
        }, 100);

      });

      test('scrolling region', function(done) {
        var x = 500;
        var y = 500;
        var region = document.querySelector('#region');

        Polymer.AppLayout.scroll({left: x, top: y, target: region});

        Polymer.Base.async(function() {
          assert.equal(region.scrollLeft, x, 'region scrollLeft');
          assert.equal(region.scrollTop, y, 'region scrollTop');
          done();
        }, 100);

      });

      test('behavior: silent', function() {
        Polymer.AppLayout.scroll({left: 100, top: 200, behavior: 'silent'});

        assert.isTrue(document.documentElement.classList.contains('app-layout-silent-scroll'));
      });

      test('behavior: smooth', function(done) {
        var scrollSpy = sinon.spy();
        window.addEventListener('scroll', scrollSpy);
        Polymer.AppLayout.scroll({top: 0});
        Polymer.AppLayout.scroll({top: 500, behavior: 'smooth'});

        window.setTimeout(function() {
          assert.isAbove(scrollSpy.callCount, 1, 'scroll top should be fired multiple times');
          done();
        }, 300);
      });

      test('smooth scrolling to the top', function(done) {
        Polymer.AppLayout.scroll({top: 1000});
        Polymer.AppLayout.scroll({top: 0, behavior: 'smooth'});

        var timer;

        window.addEventListener('scroll', function() {
          clearInterval(timer);
          timer = setTimeout(function() {
            assert.equal(window.pageYOffset, 0, 'document scrollTop');
            done();
          }, 200);
        });
      });

    });