Polymer({
  is: 'headers-form',

  properties: {
    headersList: {
      type: Array,
      notify: true
    },
    /**
     * It is currently focused input field for header name.
     * This field will receive autocomplete support.
     * @type {HTMLElement}
     */
    activeHeaderNameField: {
      type: HTMLElement,
      readOnly: true
    },
    /**
     * Active autocomplete element.
     *
     * @type {HTMLElement}
     */
    activeAutocompleteNameField: {
      type: HTMLElement,
      readOnly: true
    }
  },

  observers: [
    '_headerValuesChanged(headersList.*)'
  ],

  _headerValuesChanged: function(record) {
    if (record && record.path && record.path === 'headersList.length') {
      // Not interested in it.
      return;
    }
    // path == 'headersList' means the object was initialized.
    if (!record || !record.path || record.path === 'headersList') {
      //initilize headers support
      this.async(() => {
        record.value.forEach((header, index) => {
          this.__provideSupport(header.name, index);
        });
      });
      // console.log('aaaaaa',record);
      return;
    }
    // console.log('aaaaaa',record);
    // this.updateHeaders();
    this._provideSupport(record);
  },

  /** Called when headers form has renederd. */
  _onHeadersFormRender: function() {
    if (!this.root) {
      return;
    }
    var row = Polymer.dom(this.root).querySelectorAll('.headers-form .form-row');
    if (!row || !row.length) {
      return;
    }
    row = row.pop();
    try {
      row.children[0].children[0].focus();
    } catch (e) {

    }
  },

  _headerNameFocus: function(e) {
    var index = this.$.headersList.indexForElement(e.target);
    var elm = Polymer.dom(this.root)
      .querySelector('.headers-form .form-row:nth-child(' + (index + 1) + ') paper-autocomplete');
    if (!elm) {
      console.warn('Autocomplete element not found.');
      return;
    }
    elm.target = e.target;
    this._setActiveHeaderNameField(e.target);
    this._setActiveAutocompleteNameField(elm);
    // console.log(e.target, elm);
  },

  _openHeaderSupport: function(e) {
    var item = this.$.headersList.itemForElement(e.target);
    var elm = this.__getSupportElmForHeader(item.name);
    if (!elm) {
      console.error('No support for given header', e);
      return;
    }
    var index = this.$.headersList.indexForElement(e.target);
    var input = Polymer.dom(this.root)
      .querySelector('.headers-form .form-row:nth-child(' + (index + 1) +
        ') input[name="headerValue"]');
    if (!input) {
      console.error('Input field has not been found.');
      return;
    }
    var model = this.$.headersList.modelForElement(e.target);
    elm.target = input;
    elm.model = model;
    elm.provideSupport();
  },

  __getSupportElmForHeader: function(headerName) {
    if (headerName) {
      headerName = headerName.toLowerCase();
    }
    var query = `*[header-support="${headerName}"]`;
    return Polymer.dom(this.root).querySelector(query);
  },

  __provideSupport: function(headerName, index) {
    var parent = Polymer.dom(this.root)
      .querySelector('.headers-form .form-row:nth-child(' + (index + 1) + ')');
    if (!parent) {
      return;
    }
    var elm = this.__getSupportElmForHeader(headerName);
    // console.log('Header ', headerName, ' at index ', index, elm ? 'has' : 'has no', 'support');
    if (!elm) {
      parent.classList.remove('has-support');
    } else {
      parent.classList.add('has-support');
    }
  },

  /**
   * Called when the headers list has changed.
   * Detect header name and check if support for this header exists.
   */
  _provideSupport: function(record) {
    var path = record.path;
    if (path.indexOf('name') === -1) {
      return;
    }
    var value = record.value;
    if (value) {
      value = value.toLowerCase();
    }

    var all = record.base;
    var len = all.length;
    var index;
    for (var i = 0; i < len; i++) {
      if (all[i].name === record.value) {
        index = i;
        break;
      }
    }
    if (index === undefined) {
      return;
    }
    this.__provideSupport(value, index);
  },

  /**
   * A handler called when the user selects a suggestion.
   * @param {[type]} e [description]
   * @return {[type]}
   */
  _onHeaderNameSelected: function(e) {
    var value = e.detail.value;
    var index = this.$.headersList.indexForElement(this.activeHeaderNameField);
    if (index || index === 0) {
      this.set(['headersList', index, 'name'], value);
    }
  },

  /**
   * Handler for autosuggestion element.
   * It takes value from currently focused header name element (input) and query the datastore
   * for suggestions.
   *
   * @param {Event} e Autocomplete event
   */
  _queryHeaderName: function(e) {
    var value = e.detail.value;
    if (!value) {
      this.activeAutocompleteNameField.source = [];
      return;
    }
    // TODO: suggestions
    // this.$.headerModel.objectId = value;
    // this.$.headerModel.queryAutocomplete();
  },
  /**
   * Handler for model's data ready event.
   * This method sets received values into the suggestions of header name field.
   *
   * @param {Event} e The `data-ready` event of the model.
   */
  _setNameSuggestions: function(e) {
    var data = e.detail.data;
    if (!data) {
      this.activeAutocompleteNameField.source = [];
      return;
    }
    var suggestions = data.map((item) => item.key);
    this.activeAutocompleteNameField.source = suggestions;
  },

  _removeHeader: function(e) {
    var index = this.$.headersList.indexForElement(e.target);
    this.splice('headersList', index, 1);
    // this.updateHeaders();
  },

  appendEmptyHeader: function() {
    var item = {
      name: '',
      value: ''
    };
    this.push('headersList', item);
  }

});
