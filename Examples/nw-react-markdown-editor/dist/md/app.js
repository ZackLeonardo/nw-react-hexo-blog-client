'use strict';

var MyEditor = require('./MDEditor');
var marked = require('marked');
var React = require('react');
var ReactDOM = require('react-dom');

// var ReactMarkdown = require('react-markdown');
//
// var input = '# This is a header\n\nAnd this is a paragraph';
//
// ReactDOM.render(
//     <ReactMarkdown source={input} />,
//     document.getElementById('container')
// );

var App = React.createClass({
	displayName: 'App',

	getInitialState: function getInitialState() {
		return {
			code: '# React Markdown Editor'
		};
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
				React.createElement(MyEditor, { value: this.state.code, onChange: this.updateCode })
			),
			React.createElement('div', { className: 'preview', dangerouslySetInnerHTML: { __html: preview } })
		);
	}
});

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));