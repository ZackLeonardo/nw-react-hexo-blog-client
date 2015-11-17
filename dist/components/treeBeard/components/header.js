'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _velocityReact = require('velocity-react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// @Radium

var NodeHeader = (function (_React$Component) {
    _inherits(NodeHeader, _React$Component);

    function NodeHeader(props) {
        _classCallCheck(this, NodeHeader);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(NodeHeader).call(this, props));
    }

    _createClass(NodeHeader, [{
        key: 'render',
        value: function render() {
            var _props = this.props;
            var style = _props.style;
            var animations = _props.animations;
            var decorators = _props.decorators;

            var terminal = this.props.node.terminal;
            var active = this.props.node.active;
            var linkStyle = [style.link, active ? style.activeLink : null];
            return _react2.default.createElement(
                'a',
                {
                    href: '#',
                    ref: 'hyperlink',
                    onClick: this.props.onClick,
                    style: linkStyle },
                !terminal ? this.renderToggle(decorators, animations) : '',
                _react2.default.createElement(decorators.Header, {
                    node: this.props.node,
                    style: style.header
                })
            );
        }
    }, {
        key: 'renderToggle',
        value: function renderToggle(decorators, animations) {
            var Toggle = decorators.Toggle;
            var style = this.props.style;
            return _react2.default.createElement(
                _velocityReact.VelocityComponent,
                { ref: 'velocity',
                    duration: animations.toggle.duration,
                    animation: animations.toggle.animation },
                _react2.default.createElement(Toggle, { style: style.toggle })
            );
        }
    }]);

    return NodeHeader;
})(_react2.default.Component);

NodeHeader.propTypes = {
    style: _react2.default.PropTypes.object.isRequired,
    decorators: _react2.default.PropTypes.object.isRequired,
    animations: _react2.default.PropTypes.object.isRequired,
    node: _react2.default.PropTypes.object.isRequired,
    onClick: _react2.default.PropTypes.func
};

module.exports = NodeHeader;