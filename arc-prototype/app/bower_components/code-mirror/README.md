# Code-Mirror
Polymer element wrapping [CodeMirror](http://codemirror.net)

## What is this?
Code-Mirror is a Web Component made with [Polymer](https://www.polymer-project.org/) that wraps a default text-area with CodeMirror's highlight syntax, plugins and options.

## Installation and usage

`bower install --save advanced-rest-client/code-mirror`

Then use the component in your app:

```html
...
<head>
    <link rel="import" href="bower_components/code-mirror/code-mirror.html"/>
</head>
<body>
  <code-mirror mode="javascript" theme="ambiance" line-numbers on-change="valueChanged">
      function myScript() {
        return 100;
      }
  </code-mirror>
</body>
```

The `<code-mirror>` element must be initialized with the `mode` property set. Otherwise it will initialize itself without any syntaxt highlighting, indent and autofill support.

### Accessing options
The element exposes the `setOption()` function that should be used to set editor options.

```
this.$.cm.setOption('extraKeys', {
  'Ctrl-Space': (cm) => {
    CodeMirror.showHint(cm, CodeMirror.hint['http-headers'], {
      container: Polymer.dom(this.root)
    });
  }
});
```

Additionaly the element has the `editor` property which is a refferene to CodeMirror instance.

### Rendering hidden element
CodeMirror has issues with rendering while the element is hidden. If the element is active
but not visible (e.g. in `<iron-pages>` element) then you may want to call `refresh()`
function on a CodeMirror instance after showing the element.

### Styling
`<code-mirror>` provides the following custom properties and mixins for styling:

Custom property | Description | Default
----------------|-------------|----------
`--code-mirror` | Mixin applied to the element | `{}`
`--code-mirror-wrapper` | Mixin applied to the wrapper element (where the CM is rendered) | `{}`
`--code-mirror-editor` | Mixin applied to the editor element  | `{}`

## API
### Events
| Event | Description | Parameters |
| --- | --- | --- |
| change | Fires every time the content of the editor is changed. | - `Object` change - Is a <code>{from, to, text, removed, origin}</code> object containing information about the changes that occurred |
| before-change | This event is fired before a change is applied, and its handler may choose to modify or cancel the change. | - `Object` change - It has `from`, `to`, and `text` properties, as with the `change` event. It also has a `cancel()` method, which can be called to cancel the change, and, if the change isn't coming from an undo or redo event, an `update(from, to, text)` method, which may be used to modify the change. |

### Properties
The element has the same set of properties as defined in https://codemirror.net/doc/manual.html
They can be set using `cm.editor.setOption()` function.

#### Additional properties
| Property | Description | Type | Default |
| --- | --- | --- | --- |
| editor | Instance of the editor | Object | _none_ |

### Methods

##### focus
Focus on the editor.

**returns** _nothing_

##### setOption
Set option on the editor.

The same as `<code-mirror>.editor.setOption(option, value)`

**returns** _nothing_
