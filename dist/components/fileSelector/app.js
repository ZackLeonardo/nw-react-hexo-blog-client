'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

//定义React组件
var FileSelector = React.createClass({
  displayName: 'FileSelector',

  handleSubmit: function handleSubmit() {
    $(this.refs['myForm'].getDOMNode()).fileupload('add', { url: "myurl" });
  },
  render: function render() {
    return React.createElement(
      'form',
      { ref: 'myForm', enctype: 'multipart/form-data', onSubmit: this.handleSubmit },
      React.createElement('input', { type: 'file', webkitdirectory: true, directory: true, multiple: true })
    );
  }
});

//渲染
ReactDOM.render(React.createElement(FileSelector, null), //JSX
document.getElementById('fileSelector')); //querySelector("#content"));