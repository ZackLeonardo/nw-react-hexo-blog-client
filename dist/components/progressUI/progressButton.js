'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var ProgressButton = require('react-progress-button');

var App = React.createClass({
  displayName: 'App',
  render: function render() {
    return React.createElement(
      ProgressButton,
      { ref: 'button', onClick: this.handleClick },
      'Go!'
    );
  },
  handleClick: function handleClick() {
    this.refs.button.loading();
    //make asynchronious call
    setTimeout((function () {
      this.refs.button.success();
    }).bind(this), 3000);
  }
});

ReactDOM.render(React.createElement(App, null), document.getElementById('progressButton'));