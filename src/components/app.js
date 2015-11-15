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
	getInitialState: function () {
		return {
			code: '# React Markdown Editor'
		};
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
					<MyEditor value={this.state.code} onChange={this.updateCode} />
				</div>
				<div className="preview" dangerouslySetInnerHTML={{__html: preview}} />
			</div>
		);
	}
});

ReactDOM.render(<App />, document.getElementById('app'));
