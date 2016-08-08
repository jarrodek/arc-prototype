Polymer({

      is: 'device-layout-viewer',

      properties: {

        /**
         * The url of the page to display.
         */
        src: String,

        /**
         * The device layout to show. Possible values are `phone`, `tablet`, `laptop` and `all`.
         */
        device: {
          type: String,
          value: 'all',
          observer: '_deviceChanged'
        }

      },

      _defaultLandscapes: {
        laptop: false,
        tablet: true,
        phone: false
      },

      toggleLandscape: function() {
        this.selectedView && this.selectedView.toggleLandscape();
      },

      _deviceChanged: function(device) {
        if (device === 'all') {
          this.$.views.items.forEach(function(view) {
            view.landscape = this._defaultLandscapes[view.device];
          }, this);
        }
      }

    });