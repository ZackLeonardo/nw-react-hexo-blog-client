'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Loading = function Loading(props) {
    return _react2.default.createElement(
        'div',
        { style: props.style },
        'loading...'
    );
};

Loading.propTypes = {
    style: _react2.default.PropTypes.object
};

var Toggle = function Toggle(props) {
    var style = props.style;
    var height = style.height;
    var width = style.width;
    var midHeight = height * 0.5;
    var points = '0,0 0,' + height + ' ' + width + ',' + midHeight;
    return _react2.default.createElement(
        'div',
        { style: style.base },
        _react2.default.createElement(
            'div',
            { style: style.wrapper },
            _react2.default.createElement(
                'svg',
                { height: height, width: width },
                _react2.default.createElement('polygon', {
                    points: points,
                    style: style.arrow
                })
            )
        )
    );
};

Toggle.propTypes = {
    style: _react2.default.PropTypes.object
};

var Header = function Header(props) {
    var style = props.style;
    return _react2.default.createElement(
        'div',
        { style: style.base },
        _react2.default.createElement(
            'div',
            { style: style.title },
            props.node.name
        )
    );
};

Header.propTypes = {
    style: _react2.default.PropTypes.object,
    node: _react2.default.PropTypes.object.isRequired
};

module.exports = {
    Loading: Loading,
    Toggle: Toggle,
    Header: Header
};