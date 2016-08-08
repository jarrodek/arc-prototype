Polymer({

    is: 'shrine-app',

    properties: {

      sections: {
        type: Array,
        value: function() {
          return [
            'feature',
            'latest',
            'fashion',
            'furniture',
            'beauty',
            'food',
            'travel'
          ];
        }
      },

      selectedTab: {
        type: Number,
        computed: '_computeSelectedTab(sections, sectionData.section)'
      },

      items: {
        type: Array
      },

      featuredItems: {
        type: Array
      },

      page: {
        type: String,
        computed: '_computePage(onDetailPage)',
        reflectToAttribute: true
      },

      route: Object,

      subRoute: Object,

      sectionData: Object,

      idData: Object,

      onDetailPage: Boolean
    },

    observers: [
      '_hashDidChange(route.path, items, featuredItems)'
    ],

    ready: function() {
      this.async(function() {
        if (!this.route.path) {
          this.set('route.path', 'feature');
        }
      });
    },

    _computeSelectedTab: function(sections, section) {
      return sections.indexOf(section);
    },

    _getItemsCopy: function(items) {
      return items.slice();
    },

    _getFeaturedItem: function(featuredItems, section) {
      return featuredItems.filter(function(item) {
        return item.category.toLowerCase() === section;
      }).pop();
    },

    _getDetailItem: function(items, id) {
      return items[id];
    },

    _computePage: function(onDetailPage) {
      return onDetailPage ? 'detail' : 'list';
    },

    _hashDidChange: function() {
      // TODO(blasten) Polymer.AppScrollEffects(0);
      this.$.header._scrollTop = 0;
      this.$.header.resetLayout();
      this.$.drawer.close();
    },

    _equal: function(a, b) {
      return a === b;
    },

    _getSectionClass: function(index, selectedTab) {
      return index === selectedTab ? 'active' : '';
    },

    _shouldShowTabs: function(onDetailPage, smallScreen) {
      return !onDetailPage && !smallScreen;
    }

  });