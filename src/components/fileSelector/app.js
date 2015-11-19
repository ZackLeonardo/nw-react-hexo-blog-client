var React = require('react');
var ReactDOM = require('react-dom');

//定义React组件
var FileSelector = React.createClass({
  handleSubmit: function() {
    $(this.refs['myForm'].getDOMNode()).fileupload('add', {url: "myurl"});
  },
  render: function() {
    return (
      <form ref="myForm" enctype="multipart/form-data" onSubmit={this.handleSubmit}>
        <input type="file" webkitdirectory directory multiple/>
      </form>
    );
  }
});

//渲染
ReactDOM.render(
  <FileSelector /> , //JSX
  document.getElementById('fileSelector'));//querySelector("#content"));
