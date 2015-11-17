'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _SplitPane = require('./SplitPane');

var _SplitPane2 = _interopRequireDefault(_SplitPane);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Example = _react2.default.createClass({
  displayName: 'Example',

  render: function render() {
    return _react2.default.createElement(
      _SplitPane2.default,
      { split: 'vertical', minSize: '60', defaultSize: '150' },
      _react2.default.createElement('div', { id: 'fileTree', className: 'leftMenu' }),
      _react2.default.createElement('div', { id: 'app', className: 'rightContent' })
    );
  }

});

_reactDom2.default.render(_react2.default.createElement(Example, null), document.getElementById("container"));