Polymer({

    is: 'shrine-detail',

    properties: {

      item: {
        type: Object,
        observer: '_itemChanged'
      },

      section: {
        type: String
      },

      relatedItems: {
        type: Array
      }

    },

    _itemChanged: function(item) {
      this.$.img.src = '';
      this.$.img.src = item.imageUrl;
    }

  });