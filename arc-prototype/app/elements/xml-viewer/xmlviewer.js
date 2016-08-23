importScripts('tinyxmlsax.js');
importScripts('tinyxmlw3cdom.js');

self.onmessage = function(e) {
  var data = e.data;
  var result = '';
  try {
    var parser = new XMLViewer(data);
    result = parser.getHTML();
  } catch (e) {
    throw new Error(e.message);
  }
  parser = null;
  self.postMessage(result);
};

function XMLViewer(data) {
  // this.linkRegExp = /(&quot;|&lt;|&gt;)?([^"\s&;<>]*:\/\/[^"\s<>]*)(&quot;|&lt;|&gt;)?/gim;
  this.xml = null;
  this.latestError = null;

  var parser = new DOMImplementation();
  parser.errorChecking = false;
  try {
    this.xml = parser.loadXML(data);
  } catch (e) {
    throw new Error(parser.translateErrCode(e.code));
  }
}

XMLViewer.prototype = {
  getHTML: function() {
    var nodes = this.xml.childNodes;
    var nodesCnt = nodes.length;
    if (nodesCnt == 0) {
      return 'no xml';
    }

    var result = '<div class="prettyPrint" data-expanded="true">';
    for (var i = 0; i < nodesCnt; i++) {
      result += this.parse(nodes.item(i));
    }
    result += '</div>';

    //    	var replace = '<a response-anchor href="$1">$1</a>';
    //        var match = result.match(this.linkRegExp);
    //        replace = replace.replace(/\$0/, match)
    //        result = result.replace(this.linkRegExp,replace);

    return result;
  },
  /**
   * Parse XML node
   */
  parse: function(node) {
    var parsed = '';

    var type = node.nodeType;
    switch (type) {
      case 1: //ELEMENT_NODE, value null
        parsed += this._parseElement(node);
        break;
      case 3: //TEXT_NODE, content of node
        var value = node.nodeValue;
        value = SafeHtmlUtils.htmlEscape(value);
        if (value == '') {
          return '';
        }
        parsed += this._parseValue(value);
        break;
      case 4: //CDATA_SECTION_NODE, content of node
        parsed += '<span colapse-marker="true"><iron-icon more icon="expand-more"></iron-icon>' +
          '<iron-icon less icon="expand-less"></iron-icon></span>';
        parsed += '<span class="cdata">&lt;![CDATA[</span><div collapsible>';
        // parsed += this.urlify(SafeHtmlUtils.htmlEscape(node.nodeValue));
        parsed += SafeHtmlUtils.htmlEscape(node.nodeValue);
        parsed += '</div><span class="cdata">]]&gt;</span>';
        break;
      case 7: //document declaration
        parsed += '<div class="processing">&lt;?xml ' + node.nodeValue +
          ' ?&gt;</div>';
        break;
      case 8: //COMMENT_NODE, comment text
        parsed += '<div class="comment">&lt;--';
        parsed += node.nodeValue;
        parsed += '--&gt</div>';
        break;
    }
    parsed = '<div class="node">' + parsed + '</div>';
    return parsed;
  },

  _parseValue: function(value) {
    value = value.trim();
    var css = 'value';
    if (!isNaN(value)) {
      css += ' number';
    } else if (value === 'true' || value === 'false') {
      css += ' boolean';
    } else if (value === 'null') {
      css += ' null';
    }
    value = `<span class="${css}">${value}</span>`;
    return value;
  },

  _parseElement: function(node) {
    var childrenCount = node.childNodes.length;
    var parsed = '';
    var showArrows = false;

    if (childrenCount > 1 || this._childIsCDATA(node)) {
      parsed += '<span colapse-marker="true"><iron-icon more icon="expand-more"></iron-icon>' +
        '<iron-icon less icon="expand-less"></iron-icon></span>';
      showArrows = true;
    }
    parsed += '<span class="punctuation">&lt;</span>';
    parsed += '<span class="tagname">' + node.nodeName + '</span>';
    parsed += this.parseAttributes(node);
    if (childrenCount > 0) {
      var children = node.childNodes;
      parsed += '<span class="punctuation">&gt;</span>';

      var showInline = false;
      if (childrenCount == 1 && children.item(0).getNodeType() == 3) {
        //simple: only one child - text - show response inline.
        showInline = true;
      }
      if (showInline) {
        parsed += '<div class="inline">';
      } else {
        parsed += '<div collapse-indicator colapse-marker="true" class="collapseIndicator' +
          '">...</div>';
        parsed += '<div collapsible class="nodeMargin">';
      }
      for (var i = 0; i < childrenCount; i++) {
        parsed += this.parse(children.item(i));
      }

      parsed += '</div>';

      if (showArrows) {
        parsed += '<span arrowEmpty class="arrowEmpty">&nbsp;</span>';
      }
      parsed += '<span class="punctuation end">&lt;/</span>';
      parsed += '<span class="tagname end">' + node.nodeName + '</span>';
      parsed += '<span class="punctuation">&gt;</span>';
    } else {
      parsed += '<span class="punctuation"> /&gt;</span>';
    }
    return parsed;
  },

  _childIsCDATA: function(node) {
    if (node.firstChild instanceof DOMCDATASection) {
      return true;
    }
    return false;
  },

  parseAttributes: function(node) {
    var parsed = '';
    var attr = node.attributes;
    if (attr != null && attr.length > 0) {
      for (var i = 0; i < attr.length; i++) {
        parsed += ' ' + this.getAttributesString(attr.item(i));
      }
    }
    return parsed;
  },

  getAttributesString: function(attr) {
    var data = '<span class="attname">';
    var name = attr.getName();
    name = SafeHtmlUtils.htmlEscape(name);
    data += name;
    data += '</span>';
    data += '<span class="punctuation">=</span>';
    data += '<span class="attribute">&quot;';
    var value = attr.getValue();
    value = SafeHtmlUtils.htmlEscape(value);
    //		try{
    //			if(this.linkRegExp.test(value)){
    //				value = '<a response-anchor href="'+value+'">'+value+'</a>';
    //			}
    //		} catch(e){}
    data += value;
    data += '&quot;</span>';
    return data;
  },

  urlify: function(text) {
    var exp = /([^"\s&;]*:\/\/[^"\s]*)(&quot;)?/gim;
    return text.replace(exp, '<a response-anchor href="$1">$1</a>');
  }
};

var SafeHtmlUtils = {
  AMP_RE: new RegExp(/&/g),
  GT_RE: new RegExp(/>/g),
  LT_RE: new RegExp(/</g),
  SQUOT_RE: new RegExp(/'/g),
  QUOT_RE: new RegExp(/"/g),

  htmlEscape: function(s) {
    if (s.indexOf('&') != -1) {
      s = s.replace(SafeHtmlUtils.AMP_RE, '&amp;');
    }
    if (s.indexOf('<') != -1) {
      s = s.replace(SafeHtmlUtils.LT_RE, '&lt;');
    }
    if (s.indexOf('>') != -1) {
      s = s.replace(SafeHtmlUtils.GT_RE, '&gt;');
    }
    if (s.indexOf('"') != -1) {
      s = s.replace(SafeHtmlUtils.QUOT_RE, '&quot;');
    }
    if (s.indexOf('\'') != -1) {
      s = s.replace(SafeHtmlUtils.SQUOT_RE, '&#39;');
    }
    return s;
  }
}
