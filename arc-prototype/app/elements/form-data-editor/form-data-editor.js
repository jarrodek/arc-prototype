Polymer({
  is: 'form-data-editor',

  behaviors: [ArcBehaviors.PayloadParserBehavior],

  properties: {
    /**
     * A HTTP body message part.
     *
     * @type {String}
     */
    value: {
      type: String,
      value: '',
      notify: true
    },
    /**
     * List of form values.
     */
    valuesList: {
      type: Array,
      value: []
    },
    /**
     * If true form data is visible.
     */
    withForm: {
      type: Boolean,
      value: false,
      computed: '_computeWithForm(contentType)'
    },

    /**
     * A value of a Content-Type header.
     *
     * @type {Stirng}
     */
    contentType: {
      type: String,
      notify: true
    }
  },

  observers: [
    '_valuesListChanged(valuesList.*)',
    '_valueChanged(value)'
  ],

  /** Encode payload button press handler */
  encodePaylod: function() {
    var value = this.encodeUrlEncoded(this.value);
    this.internalChange = true;
    this.set('value', value);
    this.internalChange = false;
    if (this.tabSelected === 1) {
      let arr = this.payloadStringToArray(value);
      this.set('valuesList', arr);
    }
  },
  /** Decode payload button press handler */
  decodePaylod: function() {
    var value = this.decodeUrlEncoded(this.value);
    this.internalChange = true;
    this.set('value', value);
    this.internalChange = false;
    if (this.tabSelected === 1) {
      let arr = this.payloadStringToArray(value);
      this.set('valuesList', arr);
    }
  },

  /** Append empty param row. */
  appendEmptyParam: function() {
    var item = {
      name: '',
      value: ''
    };
    this.push('valuesList', item);
  },

  /**
   * Update headers array from form values to the HTTP string.
   */
  updateValue: function() {
    if (!this.valuesList) {
      return;
    }
    if (!this.contentType || this.contentType.indexOf('x-www-form-urlencoded') === -1) {
      return;
    }
    var value = this.payloadArrayToString(this.valuesList);
    this.internalChange = true;
    this.set('value', value);
    this.internalChange = false;
  },

  /** Compute if form tab should be shown. */
  _computeWithForm: function(contentType) {
    return contentType && contentType.indexOf('x-www-form-urlencoded') !== -1;
  },

  /** called when valuesList deep changed. */
  _valuesListChanged: function(record) {
    // if path == 'valuesList' it means the object was initialized.
    if (!record || !record.path || record.path === 'valuesList') {
      return;
    }
    this.updateValue();
  },

  /** Called when params form has renederd. */
  _onParamsRender: function() {
    if (!this.root) {
      return;
    }
    var row = Polymer.dom(this.root).querySelectorAll('.form-row');
    if (!row || !row.length) {
      return;
    }
    row = row.pop();
    try {
      row.children[0].children[0].focus();
    } catch (e) {

    }
  },

  /** Remove element from the params form */
  _removeParam: function(e) {
    var index = this.$.valuesList.indexForElement(e.target);
    this.splice('valuesList', index, 1);
  },

  // Sets the form editor from current value.
  setFormValues: function() {
    var arr = this.payloadStringToArray(this.value);
    this.set('valuesList', arr);
  },

  _updateContentType: function(e) {
    var ct = e.target.dataset.ct;
    if (!ct) {
      return;
    }
    this.contentType = ct;
  },

  _valueChanged: function() {
    if (this.internalChange) {
      return;
    }
    this.setFormValues();
  }
});
