Polymer({

      is: 'two-columns-grid',

      properties: {

        /**
         * The width of the column in px.
         */
        columnWidth: {
          type: Number,
          value: 300
        },

        /**
         * The gutter width in px.
         */
        gutter: {
          type: Number,
          value: 8
        },

        /**
         * Indicates it is in narrow layout which means the grid is displayed as single column.
         */
        narrowLayout: {
          type: Boolean,
          notify: true,
          reflectToAttribute: true
        }

      },

      observers: [
        '_updateLayout(columnWidth, gutter)'
      ],

      attached: function() {
        // observers may run before attached, and updateStyles() will skip if it is not attached.
        // So we need to make sure updateStyles() is called after it's attached.
        this._updateCustomStyles();
      },

      _updateLayout: function(columnWidth, gutter) {
        this.query = '(max-width:' + (2 * columnWidth + 4 * gutter) + 'px)';
        this._updateCustomStyles();
      },

      _updateCustomStyles: function() {
        this.updateStyles({
          '--grid-column-width': this.columnWidth + 'px',
          '--grid-gutter': this.gutter + 'px'
        });
      }

    });