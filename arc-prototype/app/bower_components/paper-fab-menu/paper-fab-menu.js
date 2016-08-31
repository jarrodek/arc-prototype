Polymer({
    is: 'paper-fab-menu',
    properties: {
      /**
       * Vertical or horizontal position of the menu.
       */
      position: {
        type: String,
        value: 'vertical'
      },
      // True when the menu is opened.
      opened: {
        type: Number,
        value: false,
        notify: true
      },
      /**
       * The color of the main button.
       */
      color: String,
      // The icon to render. It's binded to `paper-fab`'s icon property.
      icon: String
    },
    listeners: {
      'mouseover': '_testOpen',
      'mouseout': '_testClose',
      'mainFab.mouseover': '_testOpen',
      'mainFab.mouseout': '_testClose',
      'mainItems.mouseover': '_testOpen',
      'mainItems.mouseout': '_testClose'
    },

    observers: [
      '_openedChanged(opened)',
      '_colorChanged(color)'
    ],

    ready: function() {
      this._childobserver = Polymer.dom(this.$.items).observeNodes(function() {
        this._updateDelay();
      }.bind(this));
      this.listen(document.body, 'click', '_detectClick');
    },

    detached: function() {
      Polymer.dom(this.$.items).unobserveNodes(this._childobserver);
      this.unlisten(document.body, 'click', '_detectClick');
    },

    // Opens the menu
    open: function() {
      this.opened = true;
    },

    // Closes the menu
    close: function() {
      this.opened = false;
    },

    // Toogles the menu
    toggle: function() {
      this.opened = !this.opened;
    },

    // Tests if the menu should be opened and opens it if nescesary
    _testOpen: function(e) {
      if (this.opened) {
        return;
      }
      if (e.path[0].classList.contains('paper-fab-menu-container')) {
        return;
      }
      let isMain = true;
      for (let i = 0, len = e.path.length; i < len; i++) {
        let item = e.path[i];
        if (!item.classList) {
          continue;
        }
        if (item.classList.contains('menu-items') ||
          item.nodeName === 'PAPER-FAB-MENU-ITEM') {
          isMain = false;
          break;
        }
      }
      if (isMain) {
        this.opened = true;
      }
    },

    // Tests if the menu should be closed and closes it if nescesary
    _testClose: function(e) {
      if (!this.opened) {
        return;
      }
      var item = e.path[0];
      if (item && item.classList && item.classList.contains('paper-fab-menu-container')) {
        this.opened = false;
        return;
      } else if (item.id === 'tooltip') {
        this.opened = false;
        return;
      } else if (item.id === 'paperFab' && e.path[1].id === 'mainFab') {
        this.opened = false;
        return;
      }
    },

    // Opens or closes the menu depending on the argument.
    _openedChanged: function(opened) {
      var style = 'transition: 200ms all; transform : rotate(';
      style += opened ? '45' : '0';
      this.$.paperFab.customStyle['--paper-fab-iron-icon'] = style + 'deg);';
      this.$.paperFab.updateStyles();
      Polymer.dom(this).children.forEach(function(child) {
        if (child.nodeName === 'A') {
          if (!child.children) {
            return;
          }
          child = Array.from(child.children).find(function(item) {
            return item.nodeName === 'PAPER-FAB-MENU-ITEM';
          });
        }
        if (child && opened) {
          child.classList.add('opened');
        } else {
          child.classList.remove('opened');
        }
      });
    },

    // Called when color has changed.
    _colorChanged: function(color) {
      this.customStyle['--paper-fab-background'] = color;
      this.updateStyles();
      // For some reason code above do not affect main fab at bootstrap time.
      this.$.paperFab.style.backgroundColor = color;
    },

    // Updates animation delay time attribute in distributed children.
    _updateDelay: function() {
      var time = 0;
      Polymer.dom(this).children.reverse().forEach(function(child) {
        child.transitionDelay = time;
        time += 50;
      });
    },

    // Closes menu on body click.
    _detectClick: function(e) {
      var ctrl = this;
      var isMainButton = e.path.some(function(item) {
        return item === ctrl;
      });
      if (isMainButton) {
        if (!this.opened) {
          this.opened = true;
        }
        return;
      }
      this.opened = false;
    }
  });