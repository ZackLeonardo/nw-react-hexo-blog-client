'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

//定义React组件
var FolderSelector = React.createClass({
  displayName: 'FolderSelector',

  chooseFile: function chooseFile(name) {
    var chooser = document.querySelector(name);
    // chooser.addEventListener("change", function(evt) {
    console.log(this.value);
    // }, false);

    // chooser.click();
  },

  render: function render() {
    return React.createElement('input', { id: 'fileDialog', type: 'file', nwdirectory: true, onChange: this.chooseFile('#fileDialog') });
  }
});

//渲染
ReactDOM.render(React.createElement(FolderSelector, null), document.getElementById('folderSelector'));