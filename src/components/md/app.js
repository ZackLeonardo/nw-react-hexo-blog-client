var MyEditor = require('./MDEditor');
var marked = require('marked');
var React = require('react');
var ReactDOM = require('react-dom');
var PubSub = require('pubsub-js');

// var ReactMarkdown = require('react-markdown');
//
// var input = '# This is a header\n\nAnd this is a paragraph';
//
// ReactDOM.render(
//     <ReactMarkdown source={input} />,
//     document.getElementById('container')
// );
var MY_TOPIC = "mdinit";
var readFile = require('../../../src/components/backServer/files').readFile;

var App = React.createClass({
	getInitialState: function () {
		return {
			code: this.props.initCode,
		};
	},

	componentWillMount: function () {
    // this.pubsub_token = PubSub.subscribe('mdinit', function (text) {
    //   this.setState({
    //     code: text,
    //   });
    // }.bind(this));
		// document.getElementById('fileTree').addEventListener('click', this.handler);

		PubSub.subscribe(MY_TOPIC, function( msg, data ){
		  this.setState({
        code: readFile(data),
      });
		}.bind(this));

  },

  componentWillUnmount: function () {
    PubSub.unsubscribe(MY_TOPIC);
		// document.getElementById('fileTree').removeEventListener('click', this.handler);
  },

	updateCode: function (newCode) {
		this.setState({
			code: newCode
		});
	},

	render: function () {
		var preview = marked(this.state.code);
		return (
			<div className="example">
				<div className="hint">The editor is below, with default options. This example also uses marked to generate the preview on the right as you type.</div>
				<div className="editor">
					<MyEditor id="MyEditor" value={this.state.code} onChange={this.updateCode} />
				</div>
				<div className="preview" dangerouslySetInnerHTML={{__html: preview}} />
			</div>
		);
	}
});

ReactDOM.render(<App initCode={'# React Markdown Editor'} />, document.getElementById('app'));
