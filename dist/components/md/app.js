'use strict';

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
	displayName: 'App',

	getInitialState: function getInitialState() {
		return {
			code: this.props.initCode
		};
	},

	componentWillMount: function componentWillMount() {
		// this.pubsub_token = PubSub.subscribe('mdinit', function (text) {
		//   this.setState({
		//     code: text,
		//   });
		// }.bind(this));
		// document.getElementById('fileTree').addEventListener('click', this.handler);

		PubSub.subscribe(MY_TOPIC, (function (msg, data) {
			this.setState({
				code: readFile(data)
			});
		}).bind(this));
	},

	componentWillUnmount: function componentWillUnmount() {
		PubSub.unsubscribe(MY_TOPIC);
		// document.getElementById('fileTree').removeEventListener('click', this.handler);
	},

	updateCode: function updateCode(newCode) {
		this.setState({
			code: newCode
		});
	},

	render: function render() {
		var preview = marked(this.state.code);
		return React.createElement(
			'div',
			{ className: 'example' },
			React.createElement(
				'div',
				{ className: 'hint' },
				'The editor is below, with default options. This example also uses marked to generate the preview on the right as you type.'
			),
			React.createElement(
				'div',
				{ className: 'editor' },
				React.createElement(MyEditor, { id: 'MyEditor', value: this.state.code, onChange: this.updateCode })
			),
			React.createElement('div', { className: 'preview', dangerouslySetInnerHTML: { __html: preview } })
		);
	}
});

ReactDOM.render(React.createElement(App, { initCode: '# React Markdown Editor' }), document.getElementById('app'));