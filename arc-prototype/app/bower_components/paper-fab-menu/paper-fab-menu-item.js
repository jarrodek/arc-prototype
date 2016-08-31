Polymer({
    is: 'paper-fab-menu-item',
    properties: {
      // Color of the menu item.
      color: String,
      // The position of rhe tooltop. See paper-tooltip for the api.
      tooltipPosition: {
        type: String,
        value: 'left'
      },
      // Tooltip display text
      tooltip: String,
      // The delay (in ms) before the entry / exit animation begins.
      transitionDelay: Number,
      // Label only used with paper-fab when the icon is not present.
      label: String,
      // The icon to render. It's binded to `paper-fab`'s icon property.
      icon: String
    },

    observers: [
      '_updateTransitionDelay(transitionDelay)',
      '_colorChanged(color)'
    ],

    _updateTransitionDelay: function(transitionDelay) {
      this.$.menuItem.style.transitionDelay = transitionDelay + 'ms';
      this.$.menuItem.style.animationDelay = transitionDelay + 'ms';
    },

    // Called when color has changed.
    _colorChanged: function(color) {
      this.customStyle['--paper-fab-background'] = color;
      this.updateStyles();
      // For some reason code above do not affect main fab at bootstrap.
      this.$.paperFab.style.backgroundColor = color;
    },
  });