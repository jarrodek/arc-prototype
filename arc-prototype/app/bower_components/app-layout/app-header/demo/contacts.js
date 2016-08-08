var fab = document.querySelector('paper-fab');
    var header = document.querySelector('app-header');

    window.addEventListener('scroll', function() {
      var progress = header.getScrollState().progress;
      fab.toggleClass('shrink-to-hidden', progress > 0.5);
    });