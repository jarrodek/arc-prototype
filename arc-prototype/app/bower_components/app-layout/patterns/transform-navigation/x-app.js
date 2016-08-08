Polymer({

      is: 'x-app',

      properties: {

        selected: {
          type: String,
          value: 'Item One'
        },

        wideLayout: {
          type: Boolean,
          value: false,
          observer: 'onLayoutChange',
        },

        items: {
          type: Array,
          value: function() {
            return ['Item One', 'Item Two', 'Item Three', 'Item Four', 'Item Five'];
          }
        }
      },

      onLayoutChange: function(wide) {
        var drawer = this.$.drawer;

        if (wide && drawer.opened) {
          drawer.opened = false;
        }
      }
    });