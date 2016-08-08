Polymer({

    is: 'recipe-app',

    properties: {

      recipes: Object,

      _route: Object,

      _subRoute: Object,

      _pageData: Object,

      _idData: Object

    },

    attached: function() {
      this.async(function() {
        if (!this._route.path) {
          this.set('_route.path', '/home');
        }
      });
    },

    _isDetailPage: function(page) {
      return page === 'detail';
    },

    _getRecipe: function() {
      if (this.recipes && this._idData.id) {
        for (var i = 0; i < this.recipes.length; ++i) {
          var r = this.recipes[i];
          if (r.id === this._idData.id) {
            return r;
          }
        }
      }
      return null;
    },

    _drawerSelected: function() {
      if (!this.$.drawer.persistent) this.$.drawer.close();
    }

  });