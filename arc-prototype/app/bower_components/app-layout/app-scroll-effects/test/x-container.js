Polymer({

      is: 'x-container',

      behaviors: [
        Polymer.AppScrollEffectsBehavior
      ],

      properties: {
        shadow: {
          type: Boolean,
          reflectToAttribute: true
        }
      },

      observers: [
        '_xScrollEffectChanged(effects)'
      ],

      _getDOMRef: function(id) {
        return this.$[id] || null;
      },

      _updateScrollState: function(scrollTop) {
        this._runEffects(scrollTop / this.offsetHeight, scrollTop);
      },

      _xScrollEffectChanged: function() {
        this._updateScrollState(this._scrollTop);
      }
    });