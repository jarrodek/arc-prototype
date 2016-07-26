Polymer({
  is: 'raml-secscheme-editor',

  behaviors: [Polymer.IronOverlayBehavior],

  properties: {
    // Specifies the API security mechanisms.
    type: String,
    // True when the user selected the type.
    hasType: {
      type: Boolean,
      readOnly: true,
      value: false
    },
    // An alternate, human-friendly name for the security scheme.
    displayName: String,
    // Optional description
    description: String,
    // List of available security schemes types.
    availableTypes: {
      value: function() {
        return [
          'Basic Authentication',
          'Digest Authentication',
          'OAuth 1.0',
          'OAuth 2.0',
          'Pass Through'
        ];
      }
    },
    // The URI of the Temporary Credential Request endpoint (OAuth 1)
    requestTokenUri: String,
    /**
     * The URI of the Resource Owner Authorization endpoint (Oauth 1)
     * or The URI of the Authorization Endpoint (OAuth 2)
     */
    authorizationUri: String,
    // The URI of the Token Request endpoint (OAuth 1)
    tokenCredentialsUri: String,
    //  list of signature methods used by the Authorization server (OAuth 1)
    signatures: {
      type: Array,
      value: function() {
        return [];
      }
    },
    // Possible values for the signatures (OAuth 1)
    supportedSignatures: {
      type: Array,
      value: function() {
        return ['HMAC-SHA1', 'RSA-SHA1', 'PLAINTEXT'];
      }
    },
    // A list of the authorization grants supported by the API. (OAuth 2)
    authorizationGrants: {
      type: Array,
      value: function() {
        return [];
      }
    },
    // Supported authorization grants (OAuth 2)
    supportedAuthorizationGrants: {
      type: Array,
      value: function() {
        return ['authorization_code', 'password', 'client_credentials', 'implicit'];
      }
    },
    // A list of scopes supported by the API (OAuth 2)
    scopes: {
      type: Array,
      value: function() {
        return [];
      }
    },
    // True if this type can have "describedBy" node.
    hasDescribedBy: {
      type: Boolean,
      value: false,
      readOnly: true
    },

    // A list of headers in describedBy node.
    headers: {
      type: Array,
      value: function() {
        return [];
      }
    },

    // A list of query parameters in the describedBy node.
    queryParams: {
      type: Array,
      value: function() {
        return [];
      }
    },
    // Description input element.
    descInput: {
      type: HTMLElement,
      value: function() {
        return this.$.descInput;
      }
    }
  },

  observers: [
    '_typeChanged(type)'
  ],

  _typeChanged: function(type) {
    this._setHasType(!!type);
    var i = ['Pass Through', 'OAuth 2.0', 'OAuth 1.0'].indexOf(type);
    this._setHasDescribedBy(i !== -1);
  },

  _appendScope: function() {
    var value = this.$.scopeInput.value;
    if (!value) {
      return;
    }
    this.$.scopeInput.value = '';
    this.push('scopes', value);
  },

  // Remove scope button click handler
  _removeScope: function(e) {
    var item = this.$.scopeRepeater.itemForElement(e.target);
    if (!item) {
      return;
    }
    var all = this.scopes;
    var index = all.indexOf(item);
    if (index === -1) {
      return;
    }
    this.splice('scopes', index, 1);
  },

  appendHeader: function() {
    this.$.headersEditor.addHeader();
  },

  appendQueryParameter: function() {
    this.$.queryParamsEditor.addParam();
  },

  _canDisplayHeadersTable: function(hasDescribedBy, headersLength) {
    return hasDescribedBy && !!headersLength;
  },

  cancel: function() {
    this.close();
  },

  save: function() {
    var d = {
      type: this.type,
      displayName: this.displayName,
      description: this.description
    };
    switch (this.type) {
      case 'OAuth 1.0':
        d.requestTokenUri = this.requestTokenUri;
        d.authorizationUri = this.authorizationUri;
        d.tokenCredentialsUri = this.tokenCredentialsUri;
        d.signatures = this.signatures;
        break;
      case 'OAuth 2.0':
        d.authorizationUri = this.authorizationUri;
        d.accessTokenUri = this.accessTokenUri;
        d.authorizationGrants = this.authorizationGrants;
        d.scopes = this.scopes;
        break;
    }
    if (this.queryParams) {
      d.queryParams = this.queryParams;
    }
    if (this.headers) {
      d.headers = this.headers;
    }
    this.fire('security-scheme-saved', d);
    this.close();
  }
});
