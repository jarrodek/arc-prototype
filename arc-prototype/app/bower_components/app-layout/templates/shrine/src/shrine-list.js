Polymer({

    is: 'shrine-list',

    properties: {

      items: {
        type: Array
      },

      featuredItem: {
        type: Object
      },

      section: {
        type: String
      }
    },

    _sortItems: function() {
      return Math.round(Math.random()*3) - 1;
    }

  });