var React = require('react');
var ReactDOM = require('react-dom');

//定义React组件
var FileSelector = React.createClass({
  handleSubmit: function() {
    console.log(this.refs['fileInput']);
    // $(this.refs['myForm'].getDOMNode()).fileupload('add', {url: "myurl"});
  },
  render: function() {
    return (
      <input ref="fileInput" type="file" webkitdirectory directory multiple onChange={this.handleSubmit()}/>
    );
  }
});

//渲染
ReactDOM.render(
  <FileSelector /> , //JSX
  document.getElementById('fileSelector'));//querySelector("#content"));
