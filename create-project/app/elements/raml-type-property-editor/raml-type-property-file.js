
Polymer({
  is: 'raml-type-property-file',

  properties: {
    // Specifies the maximum number of bytes for a parameter value.
    // Value MUST be equal to or greater than 0.
    maxLength: {
      type: Number,
      notify: true
    },
    // Specifies the minimum number of bytes for a parameter value.
    // Minimum length of the string. Value MUST be equal to or greater than 0.
    minLength: {
      type: Number,
      notify: true
    },
    // A list of valid content-type strings for the file. The file type */* MUST be a valid value.
    fileTypes: {
      type: Array,
      value: function() {
        return [];
      },
      notify: true
    }
  }

});
