Polymer({

      is: 'blog-app',

      properties: {

        /**
         * Articles data.
         */
        articles: Object,

        route: Object,

        subRoute: Object,

        subsubRoute: Object,

        categoryData: Object,

        pageData: Object,

        idData: Object

      },

      observers: [
        '_updateArticle(articles, categoryData.category, idData.id)'
      ],

      attached: function() {
        this.async(function() {
          if (!this.route.path) {
            this.set('route.path', '/art/list');
          }
        });
      },

      _equal: function(value1, value2) {
        return value1 === value2;
      },

      _updateArticle: function(articles, category, id) {
        for (var i=0, cat; cat=articles[i]; i++) {
          if (cat.name === category) {
            for (var j=0, article; article=cat.items[j]; j++) {
              if (article.id === id) {
                this.article = article;
                return;
              }
            }
          }
        }
      },

      _drawerSelected: function() {
        if (!this.$.drawer.persistent) this.$.drawer.close();
      }

    });