Polymer({

    is: 'recipe-detail',

    properties: {

      recipe: {
        type: Object,
        observer: '__recipeChanged'
      },

      __favorite: {
        type: Boolean,
        value: false
      }

    },

    __recipeChanged: function(recipe) {
      if (recipe) {
        this.style.backgroundImage = 'url(' + recipe.imageUrl + ')';
      }
    },

    __toggleFavorite: function(event, detail) {
      this.__favorite = !this.__favorite;
    },

    __computeFavIcon: function(favorite) {
      return favorite ? 'app:favorite' : 'app:favorite-border';
    }

  });