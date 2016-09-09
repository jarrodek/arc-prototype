Polymer({
  is: 'url-parameters-editor',
  properties: {
    opened: {
      type: Boolean,
      value: false,
      notify: true,
      reflectToAttribute: true
    },
    params: Array
  },

  // listeners: {
  //   'change': '_inputChange'
  // },

  observers: [
    '_paramsChanged(params.*)'
  ],

  _paramsChanged(params) {
    console.log('_paramsChanged', params);
  },

  attached: function() {
    this.listen(document.body, 'click', '_bodyClick');
  },

  detatched: function() {
    this.unlisten(document.body, 'click', '_bodyClick');
  },

  _computeInputLabel: function(type, example) {
    var txt = type + '. ';

    if (!!example) {
      txt += `Example: ${example}`;
    } else {
      txt += 'Param value.';
    }
    return txt;
  },

  _computeInputType: function(type) {
    switch (type) {
      case 'numeric':
      case 'integer':
        return 'number';
      default:
        return 'text';
    }
  },

  _bodyClick: function(e) {
    var arr = e.path.filter((e) => e.nodeName === 'URL-PANEL');
    if (!arr.length) {
      this.opened = false;
    }
  },

  _inputChange: function(e) {
    // console.log('_inputChange', e);
    var item = this.$.repeater.modelForElement(e.target).get('item');
    var value = e.target.value;
    var param = item.param;

    this.fire('param', {
      'param': param,
      'value': value
    });
    // var matches = this.url.match(/({[a-zA-Z0-9]*})/gim);
    // if (matches === null) {
    //
    // }
  }
});
