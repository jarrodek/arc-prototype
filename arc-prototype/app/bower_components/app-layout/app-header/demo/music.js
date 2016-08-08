addEventListener('WebComponentsReady', function() {

      var appHeader = document.querySelector('app-header');
      var appBox = document.querySelector('app-box');
      var fadeBackgroundEffect = appHeader.createEffect('fade-background');

      window.addEventListener('scroll', function() {
        var progress = appBox.getScrollState().progress;
        var isCondensed = progress > 0.25;
        fadeBackgroundEffect.run(isCondensed ? 1 : 0);
        appHeader.shadow = isCondensed;
      });

      var repeater = document.querySelector('#repeater');
      repeater.items = [
        {no: 1, name: 'Marilyn Monroe', duration: '5:51'},
        {no: 2, name: 'Brand New', duration: '4:31'},
        {no: 3, name: 'Hunter', duration: '4:00'},
        {no: 4, name: 'Gush', duration: '3:54'},
        {no: 5, name: 'Happy (From "Despicable Me 2")', duration: '3:52'},
        {no: 6, name: 'Come Get It Bae', duration: '3:21'},
        {no: 7, name: 'Gust of Wind', duration: '4:45'},
        {no: 8, name: 'Lost Queen', duration: '7:56'},
        {no: 9, name: 'Know Who You Are', duration: '3:56'},
        {no: 10, name: 'It Girl', duration: '4:49'},
        {no: 11, name: 'Marilyn Monroe', duration: '5:51'},
        {no: 12, name: 'Brand New', duration: '4:31'},
        {no: 13, name: 'Hunter', duration: '4:00'},
        {no: 14, name: 'Gush', duration: '3:54'},
        {no: 15, name: 'Happy (From "Despicable Me 2")', duration: '3:52'},
        {no: 16, name: 'Come Get It Bae', duration: '3:21'},
        {no: 17, name: 'Gust of Wind', duration: '4:45'},
        {no: 18, name: 'Lost Queen', duration: '7:56'},
        {no: 19, name: 'Know Who You Are', duration: '3:56'},
        {no: 20, name: 'It Girl', duration: '4:49'}
      ];

    });