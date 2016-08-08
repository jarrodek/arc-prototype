addEventListener('WebComponentsReady', function() {

      var appHeader = document.querySelector('app-header');
      var bgHeader = document.querySelector('.bg-header');
      var appHeaderHeight = appHeader.offsetHeight;
      var bgHeaderHeight = bgHeader.offsetHeight;

      var transformBgHeader = function() {
        var y = window.scrollY;
        if (y <= bgHeaderHeight) {
          y = 1.5 * y;
        }
        var s = bgHeader.style;
        s.transform = s.webkitTransform = 'translate3d(0,' + -y + 'px,0)';
        appHeader.shadow = y > bgHeaderHeight - appHeaderHeight;
      }

      transformBgHeader();

      addEventListener('scroll', transformBgHeader);

    });