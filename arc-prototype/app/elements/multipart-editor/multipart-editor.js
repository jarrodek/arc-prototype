Polymer({
  is: 'multipart-editor',

  properties: {
    /**
     * List of files to be send with the multipart/form-data request
     */
    dataList: {
      type: Array,
      value: [],
      notify: true
    },
    /**
     * Index for filename counter in files editor.
     */
    _fileListIndex: {
      type: Number,
      value: 0
    },
    /**
     * Number of files selected by the user.
     */
    filesCount: {
      type: Number,
      computed: '_countFiles(dataList.*)'
    },
    /**
     * True if file(s) has been selected.
     */
    hasFiles: {
      type: Boolean,
      computed: '_computeHasFiles(filesCount)',
      notify: true
    }
  },
  /**
   * A handler to choose file button click.
   * This function will find a proper input[type="file"] and programatically click on it to open
   * file dialog.
   */
  _selectFile: function(e) {
    var file = e.target.parentNode.querySelector('input[type="file"]');
    if (!file) {
      return;
    }
    file.click();
  },
  /**
   * A handler to file change event for input[type="file"].
   * This will update files array for corresponding `this.dataList` array object.
   */
  _fileObjectChanged: function(e) {
    var index = this.$.dataList.indexForElement(e.target);
    if (index >= 0) {
      let files = Array.from(e.target.files);
      this.set('dataList.' + index + '.files', files);
    }
  },
  /** Count number of files choosen by the user */
  _countFiles: function() {
    var result = 0;
    if (!this.dataList) {
      return result;
    }
    this.dataList.forEach((item) => {
      result += item.files.length;
    });
    return result;
  },

  _computeHasFiles: function(no) {
    return !!no;
  },
  _removeFile: function(e) {
    var index = this.$.dataList.indexForElement(e.target);
    this.splice('dataList', index, 1);
  },
  /** Append new file form row  */
  appendEmptyFile: function() {
    var fileName = 'fileUpload';
    if (this._fileListIndex) {
      fileName += this._fileListIndex;
    }
    this._fileListIndex++;
    var item = {
      name: fileName,
      type: 'file',
      files: []
    };
    if (!this.dataList) {
      this.dataList = [];
    }
    this.push('dataList', item);
  },

  _valueMenuItemSelected: function(e) {
    switch (e.detail.item.dataset.action) {
      case 'change-to-text':
        this._changeType(e, 'text');
      break;
      case 'change-to-file':
        this._changeType(e, 'file');
      break;
      case 'delete':
        this._removeFile(e);
      break;
    }
    var target = Polymer.dom(e).rootTarget;
    target.selected = -1;
  },

  _changeType: function(e, type) {
    var model = this.$.dataList.modelForElement(e.target);
    model.set('item.type', type);
  }
});
