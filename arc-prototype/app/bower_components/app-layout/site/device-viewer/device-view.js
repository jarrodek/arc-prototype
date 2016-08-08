Polymer({

      is: 'device-view',

      properties: {

        /**
         * The url of the page to display.
         */
        src: String,

        /**
         * The device layout to show.  Possible values are `phone`, `tablet` and `laptop`.
         */
        device: {
          type: String,
          value: 'phone',
          reflectToAttribute: true
        },

        /**
         * Use landscape orientaion if this is true.
         */
        landscape: {
          type: Boolean,
          value: false,
          reflectToAttribute: true
        }

      },

      /**
       * Toggles the landscape orientation.
       */
      toggleLandscape: function() {
        this.landscape = !this.landscape;
      }

    });