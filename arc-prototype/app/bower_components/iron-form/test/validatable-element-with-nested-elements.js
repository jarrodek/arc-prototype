Polymer({

    is: 'validatable-element-with-nested-elements',

    behaviors: [
      Polymer.IronFormElementBehavior
    ],

    validate: function() {
      return true;
    },

  });