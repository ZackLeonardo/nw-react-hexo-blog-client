// (function() {
// })();

var React = require('react');
var ReactDOM = require('react-dom');


// React.render(
//   React.createElement('div', null, 'Hello, world!'),
//   document.getElementById('example')
// );

// var CommentBox = React.createClass({
//   render: function() {
//     return (
//       <div className="commentBox">
//         Hello, world! I am a CommentBox.
//       </div>
//     );
//   }
// });
//
// ReactDOM.render(<CommentBox />, document.getElementById('example'));

//定义React组件
var EzLedComp = React.createClass({
  //每个React组件都应该事先render()方法
  render : function(){
    var e =
      <div>
        <div className="ez-led">Hello, React!</div>
        <div className="ez-led">2015-04-15</div>
      </div>;

    return e;
  }
});
//渲染
React.render(
  <EzLedComp/> , //JSX
  document.getElementById('example'));//querySelector("#content"));
