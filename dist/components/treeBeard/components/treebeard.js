'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _node = require('./node');

var _node2 = _interopRequireDefault(_node);

var _decorators = require('./decorators');

var _decorators2 = _interopRequireDefault(_decorators);

var _default = require('../themes/default');

var _default2 = _interopRequireDefault(_default);

var _animations = require('../themes/animations');

var _animations2 = _interopRequireDefault(_animations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TreeBeard = (function (_React$Component) {
    _inherits(TreeBeard, _React$Component);

    function TreeBeard(props) {
        _classCallCheck(this, TreeBeard);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(TreeBeard).call(this, props));
    }

    _createClass(TreeBeard, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'ul',
                { style: this.props.style.tree.base, ref: 'treeBase' },
                _react2.default.createElement(_node2.default, {
                    node: this.props.data,
                    onToggle: this.props.onToggle,
                    animations: this.props.animations,
                    decorators: this.props.decorators,
                    style: this.props.style.tree.node
                })
            );
        }
    }]);

    return TreeBeard;
})(_react2.default.Component);

TreeBeard.propTypes = {
    style: _react2.default.PropTypes.object,
    data: _react2.default.PropTypes.object.isRequired,
    animations: _react2.default.PropTypes.object,
    onToggle: _react2.default.PropTypes.func,
    decorators: _react2.default.PropTypes.object
};

TreeBeard.defaultProps = {
    style: _default2.default,
    animations: _animations2.default,
    decorators: _decorators2.default
};

module.exports = TreeBeard;