Polymer({
  is: 'markdown-icon-button',

  properties: {
    // True to open the editor.
    opened: {
      type: Boolean,
      value: false
    },
    // Theme of the CodeMirror editor
    theme: String,
    // Value of the editor.
    value: {
      type: String,
      notify: true
    },
    /**
     * A target element to where put the content of the editor
     * when save event is fired.
     *
     * If not provided the `<markdown-icon-button>` element will only fire `markdown-save`
     * event (bubbled from the `<markdown-styles>` element.)
     */
    target: HTMLElement
  },

  listeners: {
    'markdown-save': '_onSave'
  },

  observers: [
    '_targetChanged(target)'
  ],

  detached: function() {
    if (this._oldTarget) {
      this.unlisten(this._oldTarget, 'value', '_targetValueChanged');
      this._oldTarget = undefined;
    }
  },

  // Opens the editor
  open: function() {
    this.opened = true;
  },

  // Closes the editor
  close: function() {
    this.opened = false;
  },
  /**
   * Places the content of the editor into the `target` element if provided.
   * If not provided it will do nothing and pass the event unchanged.
   */
  _onSave: function(e) {
    if (this.target) {
      this.target.value = e.detail.value;
    }
    this.opened = false;
  },

  // Observes the target for changes in the value to update current value.
  _targetChanged: function(target) {
    if (this._oldTarget) {
      this.unlisten(this._oldTarget, 'value-changed', '_targetValueChanged');
    }
    this._oldTarget = target;
    if (target) {
      this.listen(target, 'value-changed', '_targetValueChanged');
    }
  },
  // Called when target value changed.
  _targetValueChanged: function(e) {
    this.value = e.detail.value;
  }
});
