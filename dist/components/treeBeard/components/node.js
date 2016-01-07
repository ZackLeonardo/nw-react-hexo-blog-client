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

var gui = global.window.nwDispatcher.requireNwGui();

var files = require('../../../../src/components/backServer/files');
var hexoCMD = require('../../../../src/components/backServer/hexo');

// 添加右键菜单
var addMenu;
var menuMount = function menuMount(filePath) {
  addMenu = new gui.Menu();
  addMenu.append(new gui.MenuItem({
    label: 'New File',
    click: function click() {
      // add new md
      var newFileName = window.prompt("NEW FILE NAME:", "");
      if (newFileName != null && newFileName != "") {
        hexoCMD.hexoNewMD(files.getDirPath(filePath), newFileName);
        // 实现树的刷新
        var obj = document.getElementById(filePath);
        var newObj = obj.cloneNode(true);
        newObj.id = files.getDirPath(filePath) + newFileName + ".md";
        for (var i = 0; i < newObj.childNodes.length; i++) {
          if (newObj.childNodes[i].tagName == "A") {
            for (var j = 0; j < newObj.childNodes[i].childNodes.length; j++) {
              if (newObj.childNodes[i].childNodes[j].tagName == "DIV") {
                newObj.childNodes[i].childNodes[j].childNodes[0].innerHTML = newFileName + ".md";
              }
            }
          }
        }
        obj.parentNode.appendChild(newObj);
      }
    }
  }));
  addMenu.append(new gui.MenuItem({
    type: 'separator'
  }));
  addMenu.append(new gui.MenuItem({
    label: 'Rename',
    click: function click() {
      // file rename
      var name = files.getFolderNameFromDir(filePath);
      var newName = window.prompt("CHANGE THE NAME:", name);
      if (newName != null && newName != "" && newName != name) {
        files.rename(filePath, newName);
      } else if (newName == name) {
        console.log("same");
      }
      // 实现树的刷新
      var obj = document.getElementById(filePath);
      for (var i = 0; i < obj.childNodes.length; i++) {
        if (obj.childNodes[i].tagName == "A") {
          for (var j = 0; j < obj.childNodes[i].childNodes.length; j++) {
            if (obj.childNodes[i].childNodes[j].tagName == "DIV") {
              obj.childNodes[i].childNodes[j].childNodes[0].innerHTML = newName;
            }
          }
        }
      }
    }
  }));
  addMenu.append(new gui.MenuItem({
    label: 'Delete',
    click: function click() {
      // delete file
      if (window.confirm('ARE YOU SURE?')) {
        files.deleteFile(filePath);
        // 实现树的刷新
        var obj = document.getElementById(filePath);
        obj.addEventListener('delete', function (event) {
          // window.alert(event.eventType);
          obj.parentNode.removeChild(obj);
        }, false);

        var event = document.createEvent('HTMLEvents');
        event.initEvent("delete", true, true);
        event.eventType = 'delete';

        obj.dispatchEvent(event);
      }
    }
  }));
};

var latestFilePath;

var TreeNode = (function (_React$Component) {
  _inherits(TreeNode, _React$Component);

  function TreeNode(props) {
    _classCallCheck(this, TreeNode);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TreeNode).call(this, props));

    _this.state = {
      toggled: props.node.toggled
    };
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
    key: 'contextMenu',
    value: function contextMenu(e, toggled) {
      e.preventDefault();
      if (e.currentTarget.id) {
        menuMount(e.currentTarget.id);
        addMenu.popup(e.clientX, e.clientY);
      }
    }
  }, {
    key: 'onClick',
    value: function onClick() {
      var toggled = !this.state.toggled;
      var onToggle = this.props.onToggle;
      if (onToggle) {
        onToggle(this.props.node, toggled);
        if (this.props.node.terminal) {
          // this.props.style.header.base.color = 'red';
          // for (var elem in document.getElementsByTagName("li")){
          //   elem.style.backgroundColor = "red";
          // }
          this.setBorder();
        }
      }

      this.setState({ toggled: toggled });
    }

    // 设置边框

  }, {
    key: 'setBorder',
    value: function setBorder() {
      if (latestFilePath) {
        document.getElementById(latestFilePath).style.border = null;
      }
      latestFilePath = this.props.node.filePath;
      document.getElementById(latestFilePath).style.border = "thin groove #0000FF";
      document.getElementById(latestFilePath).style.borderRadius = "3px";
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
      return(
        // 通过设置id将被点击的标签标识出来，通过onContextMenu实现右键事件
        _react2.default.createElement(
          'li',
          { style: this.props.style.base, ref: 'topLevel', onContextMenu: this.contextMenu, id: this.props.node.filePath },
          this.renderHeader(decorators, animations),
          _react2.default.createElement(
            _velocityReact.VelocityTransitionGroup,
            _extends({}, animations.drawer, { ref: 'velocity' }),
            toggled ? this.renderChildren(decorators, animations) : null
          )
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