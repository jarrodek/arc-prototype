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
window.RamlBehaviors = window.RamlBehaviors || {};
/**
 * Common behavior for RAML type's properties.
 *
 * @polymerBehavior RamlBehaviors.RamlTypePropertyBehavior
 */
window.RamlBehaviors.RamlTypePropertyBehavior = {

  properties: {
    // The RAML type's property.
    property: Object,

    /**
     * A list of declared in the RAML definition types.
     * Changing this property will change the list of properties available types.
     * Note that Type created from schema can't be extended and therefore it won't be
     * considered bu the UI.
     */
    declaredTypes: {
      type: Array,
      value: function() {
        return [];
      }
    },

    baseTypes: {
      type: Array,
      value: function() {
        return [
          {value: 'any', name: 'Any'},
          {value: 'object', name: 'Object'},
          {value: 'array', name: 'Array'},
          {value: 'union', name: 'Union'},
          {value: 'number', name: 'Number'},
          {value: 'boolean', name: 'Boolean'},
          {value: 'string', name: 'String'},
          {value: 'datetime', name: 'Date and time'},
          {value: 'date-only', name: 'Date and time', hidden: true},
          {value: 'time-only', name: 'Date and time', hidden: true},
          {value: 'datetime-only', name: 'Date and time', hidden: true},
          {value: 'file', name: 'File'},
          {value: 'integer', name: 'Integer'},
          {value: 'null', name: 'Null'}
        ];
      },
      readOnly: true
    },
    // List of available types
    availableTypes: {
      type: Array,
      computed: '_computeAvailableTypes(baseTypes, declaredTypes.*)'
    },

    // True when the collapsable panel is opened.
    opened: Boolean,

    isAny: {
      type: Boolean,
      value: false
    },

    isObject: {
      type: Boolean,
      value: false
    },

    isArray: {
      type: Boolean,
      value: false
    },

    isUnion: {
      type: Boolean,
      value: false
    },

    isNumber: {
      type: Boolean,
      value: false
    },

    isBoolean: {
      type: Boolean,
      value: false
    },

    isString: {
      type: Boolean,
      value: false
    },

    isDateOnly: {
      type: Boolean,
      value: false
    },

    isTimeOnly: {
      type: Boolean,
      value: false
    },

    isDateTimeOnly: {
      type: Boolean,
      value: false
    },

    isDateTime: {
      type: Boolean,
      value: false
    },

    isFile: {
      type: Boolean,
      value: false
    },

    isInteger: {
      type: Boolean,
      value: false
    },

    isNull: {
      type: Boolean,
      value: false
    },
    // Is user defined Type.
    isDeclared: {
      type: Boolean,
      value: false
    }
  },

  observers: [
    '_typeChanged(property.type)'
  ],

  _computeAvailableTypes: function(baseTypes) {
    var declared = this.declaredTypes;
    var result = baseTypes;
    if (declared && declared.length) {
      let tmp = declared.map((item) => {
        return {
          'value': item.typeId,
          'name': item.displayName || item.typeId
        };
      });
      result = result.concat(tmp);
    }
    // console.log('_computeAvailableTypes', result);
    return result;
  },

  _typeChanged: function(type) {
    this.isAny = false;
    this.isObject = false;
    this.isArray = false;
    this.isUnion = false;
    this.isNumber = false;
    this.isBoolean = false;
    this.isString = false;
    this.isDateOnly = false;
    this.isTimeOnly = false;
    this.isDateTimeOnly = false;
    this.isDateTime = false;
    this.isFile = false;
    this.isInteger = false;
    this.isNull = false;
    switch (type) {
      case 'any': this.isAny = true; break;
      case 'object': this.isObject = true; break;
      case 'array': this.isArray = true; break;
      case 'union': this.isUnion = true; break;
      case 'number': this.isNumber = true; break;
      case 'boolean': this.isBoolean = true; break;
      case 'string': this.isString = true; break;
      case 'date-only': this.isDateOnly = true; break;
      case 'time-only': this.isTimeOnly = true; break;
      case 'datetime-only': this.isDateTimeOnly = true; break;
      case 'datetime': this.isDateTime = true; break;
      case 'file': this.isFile = true; break;
      case 'integer': this.isInteger = true; break;
      case 'null': this.isNull = true; break;
    }
  }

};
})();
