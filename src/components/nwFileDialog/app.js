var React = require('react');
var ReactDOM = require('react-dom');

//定义React组件
var FolderSelector = React.createClass({
  chooseFile: function (name) {
    var chooser = document.querySelector(name);
    // chooser.addEventListener("change", function(evt) {
      console.log(this.value);
    // }, false);

    // chooser.click();
  },

  render: function() {
    return (
      <input id="fileDialog" type="file" nwdirectory onChange={this.chooseFile('#fileDialog')}/>
    );
  }
});

//渲染
ReactDOM.render(<FolderSelector /> , document.getElementById('folderSelector'));
