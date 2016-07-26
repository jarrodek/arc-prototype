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
   * Behavior for elements that use headers parser.
   *
   * @polymerBehavior ArcBehaviors.HeadersParserBehavior
   */
  window.ArcBehaviors.HeadersParserBehavior = {
    /**
     * Filter array of headers and return not duplicated array of the same headers.
     * Duplicated headers should be appended to already found one using coma separator.
     *
     * @param {Array} headers
     *                Headers array to filter. All objects in headers array must have "name"
     *                and "value" keys.
     * @return {Array} An array of filtered headers.
     */
    filterHeaders: function(headers) {
      var _tmp = {};
      headers.forEach((header) => {
        if (header.name in _tmp) {
          if (!!header.value) {
            _tmp[header.name] += ', ' + header.value;
          }
        } else {
          _tmp[header.name] = header.value;
        }
      });
      var result = [];
      for (let _key in _tmp) {
        result[result.length] = {
          'name': _key,
          'value': _tmp[_key]
        };
      }
      return result;
    },

    /**
     * Parse headers array to Raw HTTP headers string.
     *
     * @param {Array|String|Headers} headersArray List of objects with "name" and "value"
     * properties.
     * @returns {String} A HTTP representation of the headers.
     */
    headersToString: function(headersArray) {
      if (typeof headersArray === 'string') {
        return headersArray;
      }
      if (!(headersArray instanceof Array)) {
        headersArray = this.headersToJSON(headersArray);
      }
      if (headersArray.length === 0) {
        return '';
      }
      headersArray = this.filterHeaders(headersArray);
      var result = '';
      headersArray.forEach((header) => {
        if (result !== '') {
          result += '\n';
        }
        let key = header.name;
        let value = header.value;
        if (key && key.trim() !== '') {
          result += key + ': ';
          if (value && value.trim() !== '') {
            result += value;
          }
        }
      });
      return result;
    },
    /**
     * Parse HTTP headers input from string to array of objects containing `name` and `value`
     * properties.
     *
     * @param {String|Headers} headers Raw HTTP headers input or Headers object
     * @returns {Array<Object>} The array of objects where properties are `name` as a header name and
     * `value` as a header content.
     */
    headersToJSON: function(headers) {
      if (typeof headers === 'string') {
        return this._headersStringToJSON(headers);
      } else {
        return this._hedersToJSON(headers);
      }
    },
    /**
     * Parse headers string to array of objects.
     * See `#toJSON` for more info.
     */
    _headersStringToJSON: function(headersString) {
      if (!headersString || headersString.trim() === '') {
        return [];
      }
      if (typeof headersString !== 'string') {
        throw new Error('Headers must be an instance of String.');
      }
      const result = [];
      const headers = headersString.split(/\n/gim);

      for (let i = 0, len = headers.length; i < len; i++) {
        let line = headers[i].trim();
        if (line === '') {
          continue;
        }
        let sepPosition = line.indexOf(':');
        if (sepPosition === -1) {
          result[line] = '';
          continue;
        }
        let name = line.substr(0, sepPosition);
        let value = line.substr(sepPosition + 1).trim();
        let obj = {
          name: name,
          value: value
        };
        result.push(obj);
      }
      return result;
    },

    /**
     * Parse Headers object to array of objects.
     * See `#toJSON` for more info.
     */
    _hedersToJSON: function(headers) {
      if (!headers) {
        return [];
      }
      return Array.from(headers).map((item) => {
        return {
          name: item[0],
          value: item[1]
        };
      });
    },

    /**
     * Helper method for old system: combine headers list with encoding value.
     * Note that this function will update the original array.
     *
     * @param {Array} headers An array of headers
     * @param {String} encoding An encoding string from the old request.
     * @return {Boolean} True if encoding has been added to the array.
     */
    _oldCombine: function(headers, encoding) {
      if (!(headers instanceof Array)) {
        throw new Error('Headers must be an array');
      }
      encoding = String(encoding);
      var ct = headers.filter((item) => item.name.toLowerCase() === 'content-type');
      if (ct.length === 0) {
        headers.push({
          'name': 'Content-Type',
          'value': encoding.trim()
        });
        return true;
      }
      return false;
    },

    /**
     * Get the Content-Type value from the headers.
     *
     * @param {Array|String} headers Either HTTP headers string or list of headers.
     * @return {String|null} A content-type header value or null if not found
     */
    getContentType: function(headers) {
      if (typeof headers !== 'string') {
        headers = this.headersToString(headers);
      }
      headers = headers.trim();
      if (headers === '') {
        return null;
      }
      var re = /^content-type:\s?(.*)$/im;
      var match = headers.match(re);
      if (!match) {
        return null;
      }
      var ct = match[1].trim();
      if (ct.indexOf('multipart') === -1) {
        let index = ct.indexOf('; ');
        if (index > 0) {
          ct = ct.substr(0, index);
        }
      }
      return ct;
    },

    /**
     * Replace value for given header in the headers list.
     *
     * @param {Array|String|Object} headers A headers object. Can be string, array of objects or
     * Headers object.
     * @param {String} name Header name to be replaced.
     * @param {String} value Header value to be repleced.
     * @return {Array} Updated headers.
     */
    replaceHeaderValue: function(headers, name, value) {
      var origType = 'headers';
      if (headers instanceof Array) {
        origType = 'array';
      } else if (typeof headers === 'string') {
        origType = 'string';
      }
      if (origType !== 'array') {
        headers = this.headersToJSON(headers);
      }
      var _name = name.toLowerCase();
      var found = false;
      headers.forEach((header) => {
        if (header.name.toLowerCase() === _name) {
          header.value = value;
          found = true;
        }
      });
      if (!found) {
        headers.push({
          name: name,
          value: value
        });
      }
      if (origType === 'array') {
        return headers;
      } else if (origType === 'string') {
        return this.headersToString(headers);
      }
      var obj = {};
      headers.forEach((header) => {
        obj[header.name] = header.value;
      });
      return new Headers(obj);
    },

    /**
     * Get error message for given header string.
     * @param {Header|Array|String} input A headers to check.
     * @return {String?} An error message or null if the headers are valid.
     */
    getHeaderError: function(input) {
      if (!input) {
        return null;
      }
      if (!(input instanceof Array)) {
        input = this.headersToJSON(input);
      }
      var msg = [];
      for (var i = 0, len = input.length; i < len; i++) {
        let name = input[i].name;
        let value = input[i].value;
        if (!name || !name.trim()) {
          msg[msg.length] = 'Header name can\'t be empty';
        } else if (/\s/.test(name)) {
          msg[msg.length] = 'Header name should not contain whitespaces';
        }
        if (!value || !value.trim()) {
          msg[msg.length] = 'Header value should not be empty';
        }
      }
      if (msg.length > 0) {
        return msg.join('\n');
      }
      return null;
    }

  };
})();
