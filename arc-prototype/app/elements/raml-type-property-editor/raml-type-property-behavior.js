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
window.RamlBehaviors.RamlTypePropertyBehaviorImpl = {

  properties: {
    // The RAML type's property.
    property: {
      type: Object,
      notify: true
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
window.RamlBehaviors.RamlTypePropertyBehavior = [
  window.RamlBehaviors.RamlTypeBehavior,
  window.RamlBehaviors.RamlTypePropertyBehaviorImpl
];
})();
