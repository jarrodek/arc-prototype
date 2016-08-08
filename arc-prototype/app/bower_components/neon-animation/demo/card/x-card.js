(function() {
  Polymer({
    is: 'x-card',

    behaviors: [
      Polymer.NeonSharedElementAnimatableBehavior
    ],

    properties: {
      animationConfig: {
        value: function() {
          return {
            'entry': [{
              name: 'ripple-animation',
              id: 'ripple',
              toPage: this
            }, {
              name: 'fade-out-animation',
              node: this.$.placeholder,
              timing: {
                delay: 250
              }
            }, {
              name: 'fade-in-animation',
              node: this.$.container,
              timing: {
                delay: 50
              }
            }],

            'exit': [{
              name: 'fade-out-animation',
              node: this.$.container,
              timing: {
                duration: 0
              }
            }, {
              name: 'reverse-ripple-animation',
              id: 'reverse-ripple',
              fromPage: this
            }]
          };
        }
      },

      sharedElements: {
        value: function() {
          return {
            'ripple': this.$.placeholder,
            'reverse-ripple': this.$.placeholder
          };
        }
      }
    }
  });
})();