'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactUtils = require('react-utils');

var _reactUtils2 = _interopRequireDefault(_reactUtils);

var _velocityReact = require('velocity-react');

var _header = require('./header');

var _header2 = _interopRequireDefault(_header);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TreeNode = (function (_React$Component) {
    _inherits(TreeNode, _React$Component);

    function TreeNode(props) {
        _classCallCheck(this, TreeNode);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TreeNode).call(this, props));

        _this.state = { toggled: props.node.toggled };
        _this.onClick = _this.onClick.bind(_this);
        return _this;
    }

    _createClass(TreeNode, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(props) {
            var toggled = props.node.toggled;
            if (toggled !== undefined) {
                this.setState({ toggled: toggled });
            }
        }
    }, {
        key: 'onClick',
        value: function onClick() {
            var toggled = !this.state.toggled;
            var onToggle = this.props.onToggle;
            if (onToggle) {
                onToggle(this.props.node, toggled);
            }
            this.setState({ toggled: toggled });
        }
    }, {
        key: 'animations',
        value: function animations() {
            var props = this.props;
            var anim = _extends({}, props.animations, props.node.animations);
            return {
                toggle: anim.toggle(this.state),
                drawer: anim.drawer(this.state)
            };
        }
    }, {
        key: 'decorators',
        value: function decorators() {
            // Merge Any Node Based Decorators Into The Pack
            var props = this.props;
            var nodeDecorators = props.node.decorators || {};
            return _extends({}, props.decorators, nodeDecorators);
        }
    }, {
        key: 'render',
        value: function render() {
            var decorators = this.decorators();
            var animations = this.animations();
            var toggled = this.state.toggled;
            return _react2.default.createElement(
                'li',
                { style: this.props.style.base, ref: 'topLevel' },
                this.renderHeader(decorators, animations),
                _react2.default.createElement(
                    _velocityReact.VelocityTransitionGroup,
                    _extends({}, animations.drawer, { ref: 'velocity' }),
                    toggled ? this.renderChildren(decorators, animations) : null
                )
            );
        }
    }, {
        key: 'renderHeader',
        value: function renderHeader(decorators, animations) {
            return _react2.default.createElement(_header2.default, {
                decorators: decorators,
                animations: animations,
                style: this.props.style,
                node: this.props.node,
                onClick: this.onClick
            });
        }
    }, {
        key: 'renderChildren',
        value: function renderChildren(decorators) {
            var _this2 = this;

            if (this.props.node.loading) {
                return this.renderLoading(decorators);
            }
            return _react2.default.createElement(
                'ul',
                { style: this.props.style.subtree, ref: 'subtree' },
                _reactUtils2.default.children.map(this.props.node.children, function (child, index) {
                    return _react2.default.createElement(TreeNode, _extends({}, _this2._eventBubbles(), {
                        key: index,
                        node: child,
                        decorators: _this2.props.decorators,
                        animations: _this2.props.animations,
                        style: _this2.props.style
                    }));
                })
            );
        }
    }, {
        key: 'renderLoading',
        value: function renderLoading(decorators) {
            return _react2.default.createElement(
                'ul',
                { style: this.props.style.subtree },
                _react2.default.createElement(
                    'li',
                    null,
                    _react2.default.createElement(decorators.Loading, { style: this.props.style.loading })
                )
            );
        }
    }, {
        key: '_eventBubbles',
        value: function _eventBubbles() {
            return { onToggle: this.props.onToggle };
        }
    }]);

    return TreeNode;
})(_react2.default.Component);

TreeNode.propTypes = {
    style: _react2.default.PropTypes.object.isRequired,
    node: _react2.default.PropTypes.object.isRequired,
    decorators: _react2.default.PropTypes.object.isRequired,
    animations: _react2.default.PropTypes.object.isRequired,
    onToggle: _react2.default.PropTypes.func
};

module.exports = TreeNode;