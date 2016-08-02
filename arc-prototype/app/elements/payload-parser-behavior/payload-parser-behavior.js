(function() {

  'use strict';
  /**
  @license
  Copyright 2016 Pawel Psztyc, The ARC team
  Licensed under the Apache License, Version 2.0 (the "License"); you may not
  use this file except in compliance with the License. You may obtain a copy of
  the License at
  http://www.apache.org/licenses/LICENSE-2.0
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
  WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
  License for the specific language governing permissions and limitations under
  the License.
  */
  window.ArcBehaviors = window.ArcBehaviors || {};
  /**
   * Behavior for elements that use payload parser.
   *
   * @polymerBehavior ArcBehaviors.PayloadParserBehavior
   */
  var PayloadParserBehaviorImpl = {

    get AMP_RE() {
      if (this._AMP_RE) {
        return this._AMP_RE;
      }
      this._AMP_RE = new RegExp(/&/g);
      return this._AMP_RE;
    },

    get GT_RE() {
      if (this._GT_RE) {
        return this._GT_RE;
      }
      this._GT_RE = new RegExp(/>/g);
      return this._GT_RE;
    },

    get LT_RE() {
      if (this._LT_RE) {
        return this._LT_RE;
      }
      this._LT_RE = new RegExp(/</g);
      return this._LT_RE;
    },

    get SQUOT_RE() {
      if (this._SQUOT_RE) {
        return this._SQUOT_RE;
      }
      this._SQUOT_RE = new RegExp(/'/g);
      return this._SQUOT_RE;
    },

    get QUOT_RE() {
      if (this._QUOT_RE) {
        return this._QUOT_RE;
      }
      this._QUOT_RE = new RegExp(/"/g);
      return this._QUOT_RE;
    },

    /**
     * Escape HTML to save HTML text.
     *
     * @param {String} s A HTML string to be escaped.
     */
    htmlEscape: function(s) {
      if (s.indexOf('&') !== -1) {
        s = s.replace(this.AMP_RE, '&amp;');
      }
      if (s.indexOf('<') !== -1) {
        s = s.replace(this.LT_RE, '&lt;');
      }
      if (s.indexOf('>') !== -1) {
        s = s.replace(this.GT_RE, '&gt;');
      }
      if (s.indexOf('"') !== -1) {
        s = s.replace(this.QUOT_RE, '&quot;');
      }
      if (s.indexOf('\'') !== -1) {
        s = s.replace(this.SQUOT_RE, '&#39;');
      }
      return s;
    },

    /**
     * Parse input array to string x-www-form-urlencoded
     *
     * @param {Array<Object>} arr Input array. Each element musct contain an object with
     * `name` and `value` keys.
     * @return {String} A parsed string of `name`=`value` pairs of the input objects.
     */
    payloadArrayToString: function(arr) {
      var result = '';
      if (!arr) {
        return result;
      }
      arr.forEach((item) => {
        let name = this._payloadParamValue(item.name);
        let value = this._payloadParamValue(item.value);
        if (!name && !value) {
          return;
        }
        if (result) {
          result += '&';
        }
        result += name + '=' + value;
      });
      return result;
    },

    /**
     * Parse input string to array of x-www-form-urlencoded form parameters.
     *
     * @param {String} input A string of HTTP x-www-form-urlencoded parameters
     * @return {Array<Object>} An array of params with `name` and `value` keys.
     */
    payloadStringToArray: function(input) {
      var result = [];
      if (!input || !input.trim()) {
        return result;
      }
      //Chrome inspector has FormData output in format: `param-name`:`param-value`
      //When copying from inspector the ':' must be replaced with '='
      var htmlInputCheck = /^([^\\=]{1,})=(.*)$/m;
      if (!htmlInputCheck.test(input)) {
        //replace chome inspector data.
        input = input.replace(/^([^\\:]{1,}):(.*)$/gm, '$1=$2&').replace(/\n/gm, '');
        input = input.substr(0, input.length - 1);
      }

      result = this._createPayloadParamsArray(input);
      return result;
    },
    /**
     * Converts a string to an array with objects containing name and value keys
     * @param {String} input An input string
     * @return {Array.<Object>} An array of params with `name` and `value` keys.
     */
    _createPayloadParamsArray: function(input) {
      var result = [];
      if (!input) {
        return result;
      }
      var state = 0; // 0 - reading name, 1 - reading value
      var i = 0;
      var _tmpName = '';
      var _tmpValue = '';
      while (true) {
        let ch = input[i++];
        if (ch === undefined) {
          if (_tmpValue || _tmpName) {
            result[result.length] = {
              name: _tmpName,
              value: _tmpValue
            };
          }
          break;
        }
        if (ch === '=') {
          if (state !== 1) {
            state = 1;
            continue;
          }
        }
        if (ch === '&') {
          state = 0;
          result[result.length] = {
            name: _tmpName,
            value: _tmpValue
          };
          _tmpName = '';
          _tmpValue = '';
          continue;
        }
        if (state === 0) {
          _tmpName += ch;
        } else if (state === 1) {
          _tmpValue += ch;
        }
      }
      return result;
    },

    /**
     * Encode payload to x-www-form-urlencoded string.
     *
     * @param {Array<object>|String} input An input data.
     */
    encodeUrlEncoded(input) {
      if (!input || !input.length) {
        return input;
      }
      var isArray = true;
      if (!(input instanceof Array)) {
        isArray = false;
        input = this.payloadStringToArray(input);
      }
      input.forEach((obj) => {
        obj.name = this.encodeQueryString(obj.name);
        obj.value = this.encodeQueryString(obj.value);
      });
      if (isArray) {
        return input;
      }
      return this.payloadArrayToString(input);
    },

    /**
     * Decode x-www-form-urlencoded data.
     *
     * @param {Array<object>|String} input An input data.
     */
    decodeUrlEncoded: function(input) {
      if (!input || !input.length) {
        return input;
      }
      var isArray = true;
      if (!(input instanceof Array)) {
        isArray = false;
        input = this.payloadStringToArray(input);
      }
      input.forEach((obj) => {
        obj.name = this.decodeQueryString(obj.name);
        obj.value = this.decodeQueryString(obj.value);
      });
      if (isArray) {
        return input;
      }
      return this.payloadArrayToString(input);
    },

    /**
     * Parse input string as a payload param key or value.
     *
     * @param {String} input An input to parse.
     */
    _payloadParamValue: function(input) {
      if (!input) {
        return String();
      }
      input = String(input);
      input = input.trim();
      return input;
    },

    /**
     * Parse a line of key=value http params into an object with `name` and `value` keys.
     *
     * @param {String} input A input line of x-www-form-urlencoded text tike `param=value`
     * @return {Object} A parsed object with `name` and `value` keys.
     * @deprecated It's old parser. Use `_createPayloadParamsArray` instead.
     */
    _paramLineToFormObject: function(input) {
      if (!input) {
        return;
      }
      var _tmp = input.split('=');
      var name = _tmp[0].trim();
      if (!name && _tmp.length === 1) {
        return;
      }
      var value;
      if (_tmp.length === 1) {
        value = '';
      } else {
        value = _tmp[1].trim();
      }
      return {
        name: name,
        value: value
      };
    }
  };

  window.ArcBehaviors.PayloadParserBehavior = [
    window.ArcBehaviors.UrlParserBehavior,
    PayloadParserBehaviorImpl
  ];
})();
