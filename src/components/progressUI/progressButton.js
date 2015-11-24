var React = require('react');
var ReactDOM = require('react-dom');
var ProgressButton = require('react-progress-button');

var App = React.createClass({
  render() {
    return (
      <div>
        <ProgressButton ref='button' onClick={this.handleClick}>
          Go!
        </ProgressButton>
      </div>
    );
  },

  handleClick() {
    this.refs.button.loading();
    //make asynchronious call
    setTimeout(function() {
      this.refs.button.success();
    }.bind(this), 3000);
  }
});

ReactDOM.render(<App />, document.getElementById('progressButton'));
