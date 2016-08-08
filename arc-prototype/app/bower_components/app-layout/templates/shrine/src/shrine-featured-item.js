Polymer({

    is: 'shrine-featured-item',

    properties: {

      item: {
        type: Object,
        observer: '_itemChanged'
      }

    },

    _itemChanged: function(item) {
      this.style.visibility = item && item.title ? 'visible' : 'hidden';
      this.$.img.src = '';
      this.$.img.src = item ? item.imageUrl : '';
    }

  });