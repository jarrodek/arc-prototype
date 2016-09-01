Polymer({
      is: 'prism-demo',

      properties: {
        code: {
          type: String,
          observer: '_render'
        },

        lang: {
          type: String
        }
      },

      attached: function() {
        this._render();
      },

      _render: function() {
        this.$.output.innerHTML = this.highlight(this.code, this.lang);
      },

      highlight: function(code, lang) {
        return this.fire('syntax-highlight', {code: code, lang: lang}).detail.code;
      }
    });