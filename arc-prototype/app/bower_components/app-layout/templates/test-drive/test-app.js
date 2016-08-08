Polymer({

    is: 'test-app',

    properties: {

      condenses: {
        type: Boolean,
        value: true
      },

      fixed: {
        type: Boolean,
        value: true
      },

      reveals: {
        type: Boolean,
        value: false
      },

      shadow: {
        type: Boolean,
        value: false
      },

      blendBackground: {
        type: Boolean,
        value: true
      },

      fadeBackground: {
        type: Boolean,
        value: false
      },

      parallaxBackground: {
        type: Boolean,
        value: true
      },

      resizeSnappedTitle: {
        type: Boolean,
        value: false
      },

      resizeTitle: {
        type: Boolean,
        value: true
      },

      waterfall: {
        type: Boolean,
        value: true
      }

    },

    observers: [
      '_removeIf("fixed", reveals)',
      '_removeIf("reveals", fixed)',
      '_removeIf("shadow", waterfall)',
      '_removeIf("blendBackground", fadeBackground)',
      '_removeIf("fadeBackground", blendBackground)',
      '_removeIf("resizeSnappedTitle", resizeTitle)',
      '_removeIf("resizeTitle", resizeSnappedTitle)',
      '_removeIf("waterfall", shadow)'
    ],

    _computeEffects: function() {
      return [
        this.blendBackground ? 'blend-background ' : '',
        this.fadeBackground ? 'fade-background ' : '',
        this.parallaxBackground ? 'parallax-background ' : '',
        this.resizeSnappedTitle ? 'resize-snapped-title ' : '',
        this.resizeTitle ? 'resize-title ' : '',
        this.waterfall ? 'waterfall ' : ''
      ].join('');
    },

    _removeIf: function(propName, value) {
      if (this[propName] && value) {
        this[propName] = false;
      }
    }

  });