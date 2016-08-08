var drawerLayout = document.getElementById('drawerLayout');
    document.getElementById('toggle').addEventListener('tap', function() {
      if (drawerLayout.forceNarrow || !drawerLayout.narrow) {
        drawerLayout.forceNarrow = !drawerLayout.forceNarrow;
      } else {
        drawerLayout.drawer.toggle();
      }
    });