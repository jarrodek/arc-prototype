Polymer({
    is: 'paper-autocomplete',
    behaviors: [
      Polymer.IronOverlayBehavior,
      Polymer.IronScrollTargetBehavior
    ],
    /**
     * Fired when user entered some text into the input.
     * It is a time to query external datastore for suggestions and update "source" property.
     * Source should be updated event if the backend result with empty values and should set
     * the list to empty array.
     *
     * Nore that setting up source in response to this event after the user has closed
     * the dropdown it will have no effect at the moment.
     *
     * @event query
     * @param {String} value An entered phrase in text field.
     */
    /**
     * Fired when the item was selected by the user.
     * At the time of receiving this event new value is already set in target input field.
     *
     * @event selected
     * @param {String} value Selected value
     */

    properties: {
      /**
       * List of suggestions to display.
       * If the array items are strings they will be used for display a suggestions and
       * to insert a value.
       * If the list is an object the each object must contain `value` and `display`
       * properties.
       * The `display` property will be used in the suggestions list and the
       * `value` property will be used to insert the value to the referenced text field.
       *
       * @type {Array<Object>|Array<String>}
       */
      source: {
        type: Array
      },
      /**
       * `value` Selected object from the suggestions
       */
      value: {
        type: Object,
        notify: true
      },
      /**
       * List of suggestion that are displayed.
       */
      suggestions: {
        type: Array,
        value: [],
        readOnly: true
      },
      /**
       * A target input field to observe.
       * This may be an ID if the field or an element itself.
       *
       * If this is set the element will not display it's own input field.
       * @type {HTMLElement}
       */
      target: HTMLElement,
      /**
       * Currently selected item on a suggestions list.
       * @type {Number}
       */
      selectedItem: {
        type: Number,
        value: 0
      },
      scrollTarget: {
        type: Object,
        value: function() {
          return this.$.container;
        }
      },
      sizingTarget: {
        type: HTMLElement,
        value: function() {
          return this.$.container;
        }
      },
      /**
       * True when user query changed and waiting for `source` property update
       */
      loading: {
        type: Boolean,
        value: false,
        readOnly: true,
        notify: true
      },
      /**
       * Set this to true if you use async operation in response for query event.
       * This will display a loader when querying for more suggestions.
       * Do not use it it you do not handle suggestions asynchronously.
       */
      loader: {
        type: Boolean,
        value: false
      },

      _showLoader: {
        type: Boolean,
        computed: '_computeShowLoader(loader, loading)'
      },

      isAttached: Boolean,

      // If true it will opend suggestions on input field focus.
      openOnFocus: {
        type: Boolean,
        value: false
      }
    },

    observers: [
      '_targetChanged(target, isAttached)',
      '_filterSuggestions(source)'
    ],

    listeners: {
      'tap': 'acceptSelection'
    },

    // attached: function() {
    // this.sizingTarget = this.$.container;
    // },

    /* Handler for target property change. */
    _targetChanged: function(target, isAttached) {
      // console.log('_targetChanged');
      if (!isAttached) {
        return;
      }
      this.resetFit();
      if (this._oldTarget) {
        this.unlisten(this._oldTarget, 'input', '_valueChanged');
        this.unlisten(this._oldTarget, 'focus', '_targetFocus');
        console.log('unlisten focus', this._oldTarget);
        this._oldTarget = null;
      }
      if (!target) {
        return;
      }
      //this.fitInto = target;
      if (typeof target === 'string') {
        this.target = this.domHost ? this.domHost.$[target] :
              Polymer.dom(this.ownerDocument).querySelector('#' + target);
        //this will call the function again with the element attached.
      } else if (target) {
        this.listen(target, 'input', '_valueChanged');
        this.listen(target, 'focus', '_targetFocus');
        this._oldTarget = target;
        if (target === document.activeElement) {
          this._targetFocus();
        }
        // this.fitInto = window;
      }
    },
    /**
     * Handler to be called when input of the text field changes.
     */
    _valueChanged: function() {
      // console.log('_valueChanged');
      if (!this.isAttached || !this._oldTarget) {
        return;
      }
      var value = this._oldTarget.value;
      if (this._previousQuery) {
        if (value.indexOf(this._previousQuery) === 0) {
          this._previousQuery = value;
          this._filterSuggestions();
          return;
        } else {
          // if removing a letter from the field it is not
          // new query either. We already have this suggestions.
          var removedLast = this._previousQuery.substr(0, this._previousQuery - 2);
          if (value.indexOf(removedLast) === 0) {
            this._previousQuery = value;
            this._filterSuggestions();
            return;
          }
          //this is a new query
          this._previousQuery = null;
          this._setSuggestions([]);
        }
      } else if (!value && this._previousQuery === undefined) {
        // First query without the value means initialization.
        return;
      }
      this.fire('query', {
        value: value
      });
      this._previousQuery = value;
      if (!this.opened) {
        this.selectedItem = 0;
      }
      this._filterSuggestions();
      this._setLoading(true);
    },
    /**
     * Filter `source` array for current value.
     * @return {[type]} [description]
     */
    _filterSuggestions: function() {
      if (!this.isAttached || !this._oldTarget) {
        return;
      }
      if (this._previousQuery === undefined) {
        return;
      }
      this._setLoading(false);
      var source = this.source;
      if (!source /*|| !this._previousQuery*/) {
        this._setSuggestions([]);
        return;
      }
      var query = this._previousQuery ? this._previousQuery.toLowerCase() : '';
      var filter = (item) => {
        var value = (typeof item === 'string') ? item : item.value;
        return value.toLowerCase().indexOf(query) !== -1;
      };
      var filtered = query ? source.filter(filter) : source;
      if (filtered.length === 0) {
        this.close();
        return;
      }
      filtered.sort(function(a, b) {
        var valueA = (typeof a === 'string') ? a : a.value;
        var valueB = (typeof b === 'string') ? b : b.value;
        var aIndex = valueA.indexOf(query);
        var bIndex = valueB.indexOf(query);

        if (aIndex === 0 && bIndex !== 0) {
          return 1;
        }
        if (aIndex !== 0 && bIndex === 0) {
          return -1;
        }
        if (valueA > valueB) {
          return 1;
        }
        if (valueA < valueB) {
          return -1;
        }
        return 0;
      });
      this._setSuggestions(filtered);
      this.open();
    },
    /* Compute suggestion display value */
    _suggestionDisplay: function(item) {
      return item.value || item;
    },
    /**
     * Highlight previous suggestion
     */
    selectPrevious: function() {
      if (!this.opened) {
        this.open();
      }
      this.$.selector.selectPrevious();
      this.ensureItemVisible(false);
    },
    /**
     * Highlight next suggestion
     */
    selectNext: function() {
      if (!this.opened) {
        this.open();
      }
      this.$.selector.selectNext();
      this.ensureItemVisible(true);
    },
    /**
     * Accepts currently selected suggestion and enters it into a text field.
     */
    acceptSelection: function() {
      if (!this.opened) {
        return;
      }
      var value = this.$.repeater.itemForElement(this.$.selector.selectedItem);
      if (typeof value !== 'string') {
        value = value.value;
      }

      this.target.value = value;
      this.async(function() {
        this.fire('selected', {
          value: value
        });
        this.close();
      });
    },
    /**
     * Ensure that the selected item is visible in the scroller.
     * When there is more elements to show than space available (height)
     * then some elements will be hidden. When the user use arrows to navigate
     * the selection may get out from the screen. This function ensures that
     * currently selected element is visible.
     *
     * @param {Boolean} bottom If trully it will ensure that the element is
     * visible at the bottom of the container. On the top otherwise.
     */
    ensureItemVisible: function(bottom) {
      var container = this.scrollTarget;
      var index = this.$.selector.selected;
      if (bottom && index === 0) {
        this.scroll(0);
        return;
      }
      var toMove;
      if (!bottom && index === this.suggestions.length - 1) {
        toMove = container.scrollHeight - container.offsetHeight;
        this.scroll(0, toMove);
        return;
      }
      var item = this.$.selector.selectedItem;
      var containerOffsetHeight = bottom ? container.offsetHeight : 0;
      var itemOffsetHeight = bottom ? item.offsetHeight : 0;
      var visible = containerOffsetHeight + container.scrollTop;
      var treshold = item.offsetTop + itemOffsetHeight;

      if (bottom && treshold > visible) {
        toMove = item.offsetHeight + item.offsetTop - container.offsetHeight;
        this.scroll(0, toMove);
      } else if (!bottom && visible > treshold) {
        this.scroll(0, treshold);
      }
    },

    _computeShowLoader: function(loader, loading) {
      return !!loader && !!loading;
    },

    _targetFocus: function() {
      if (!this.openOnFocus || this.opened) {
        return;
      }
      this._previousQuery = this._previousQuery || '';
      this.async(this._valueChanged, 200);
      // this._valueChanged();
    }
  });