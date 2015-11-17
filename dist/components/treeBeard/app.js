'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _treeBeard = require('./treeBeard');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var data = {
    name: 'root',
    toggled: true,
    children: [{
        name: 'parent',
        children: [{
            name: 'child',
            terminal: true
        }]
    }, {
        name: 'loading parent',
        loading: true
    }, {
        name: 'parent',
        children: [{
            name: 'nested parent',
            children: [{
                name: 'nested child',
                terminal: true
            }]
        }]
    }]
};

var TreeBeard = (function (_React$Component) {
    _inherits(TreeBeard, _React$Component);

    function TreeBeard(props) {
        _classCallCheck(this, TreeBeard);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(TreeBeard).call(this, props));
    }

    _createClass(TreeBeard, [{
        key: 'onToggle',
        value: function onToggle() /* node, toggled */{
            // ...
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(_treeBeard.Treebeard, {
                data: data,
                onToggle: this.onToggle
            });
        }
    }]);

    return TreeBeard;
})(_react2.default.Component);

var content = document.getElementById('treeBeard');
_reactDom2.default.render(_react2.default.createElement(TreeBeard, null), content);