(function() {
    // Keeps track of the toast currently opened.
    var currentSheet = null;
    Polymer({
      is: 'bottom-sheet',

      behaviors: [
        Polymer.IronOverlayBehavior
      ],

      properties: {
        /**
         * The element to fit `this` into.
         * Overridden from `Polymer.IronFitBehavior`.
         */
        fitInto: {
          type: Object,
          value: window,
          observer: '_onFitIntoChanged'
        },

        /**
         * The label of the bottom sheet.
         */
        label: {
          type: String,
          value: ''
        },
      },

      created: function() {
        // this._autoClose = null;
        Polymer.IronA11yAnnouncer.requestAvailability();
      },

      listeners: {
        'transitionend': '__onTransitionEnd'
      },

      _openedChanged: function() {
        if (this.opened) {
          if (currentSheet && currentSheet !== this) {
            currentSheet.close();
          }
          currentSheet = this;
          this.fire('iron-announce', {
            text: 'Menu opened'
          });
        } else if (currentSheet === this) {
          currentSheet = null;
        }
        Polymer.IronOverlayBehaviorImpl._openedChanged.apply(this, arguments);
      },

      /**
       * Overridden from `IronOverlayBehavior`.
       */
      _renderOpened: function() {
        this.classList.add('bottom-sheet-open');
      },
      /**
       * Overridden from `IronOverlayBehavior`.
       */
      _renderClosed: function() {
        this.classList.remove('bottom-sheet-open');
      },
      /**
       * @private
       */
      _onFitIntoChanged: function(fitInto) {
        this.positionTarget = fitInto;
      },
      __onTransitionEnd: function(e) {
        // there are different transitions that are happening when opening and
        // closing the toast. The last one so far is for `opacity`.
        // This marks the end of the transition, so we check for this to determine if this
        // is the correct event.
        if (e && e.target === this && e.propertyName === 'opacity') {
          if (this.opened) {
            this._finishRenderOpened();
          } else {
            this._finishRenderClosed();
          }
        }
      },
      /**
       * Fired when `bottom-sheet` is opened.
       *
       * @event 'iron-announce'
       * @param {{text: string}} detail Contains text that will be announced.
       */
    });
  })();