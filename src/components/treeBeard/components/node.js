'use strict';

import React from 'react';
import rutils from 'react-utils';
import {VelocityTransitionGroup} from 'velocity-react';

import NodeHeader from './header';

var gui = global.window.nwDispatcher.requireNwGui();

var dataInsert = require('./data').dataInsert;
var dataDelete = require('./data').dataDelete;

var files = require('../../../../src/components/backServer/files');

// 添加右键菜单
var addMenu;
var menuMount = function(filePath) {
  addMenu = new gui.Menu();
  addMenu.append(new gui.MenuItem({
      label: 'New File',
      click: function() {
          // doSomething
          // dataInsert(data, {name: 'insertTest.md', terminal: true, filePath: 'insertTest.md'});
          if (window.prompt('r u sure?')){
            window.alert();
          }
      }
  }));
  addMenu.append(new gui.MenuItem({
      type: 'separator',
  }));
  addMenu.append(new gui.MenuItem({
      label: 'Rename',
      click: function() {
          // file rename

          // if (window.confirm('ARE YOU SURE?')){
          //   window.alert((this.state.toggled).bind(this));
          //   // files.deleteFile('/Users/zoudeyi/Desktop/hexo/source/_posts/hello-world1.md');
          // }
      }
  }));
  addMenu.append(new gui.MenuItem({
    label: 'Delete',
    click: function() {
      // delete file
      if (window.confirm('ARE YOU SURE?')){
        files.deleteFile(filePath);
      }
    }
  }));
}

class TreeNode extends React.Component {
    constructor(props){
        super(props);
        this.state = { toggled: props.node.toggled };
        this.onClick = this.onClick.bind(this);
    }
    componentWillReceiveProps(props){
        let toggled = props.node.toggled;
        if(toggled !== undefined){
            this.setState({ toggled });
        }
    }
    contextMenu(e, toggled) {
      e.preventDefault();
      if (e.currentTarget.id){
        // window.alert(e.currentTarget.id);
        menuMount(e.currentTarget.id);
      }
      addMenu.popup(e.clientX, e.clientY);
    }
    onClick(){
        let toggled = !this.state.toggled;
        let onToggle = this.props.onToggle;
        if(onToggle){ onToggle(this.props.node, toggled); }
        this.setState({ toggled: toggled });
    }
    animations(){
        const props = this.props;
        let anim = Object.assign({}, props.animations, props.node.animations);
        return {
            toggle: anim.toggle(this.state),
            drawer: anim.drawer(this.state)
        };
    }
    decorators(){
        // Merge Any Node Based Decorators Into The Pack
        const props = this.props;
        let nodeDecorators = props.node.decorators || {};
        return Object.assign({}, props.decorators, nodeDecorators);
    }
    render(){
        const decorators = this.decorators();
        const animations = this.animations();
        const toggled = this.state.toggled;
        return (
          // 通过设置id将被点击的标签标识出来，通过onContextMenu实现右键事件
          <li style={this.props.style.base} ref="topLevel" onContextMenu={this.contextMenu} id={this.props.node.filePath}>
            {this.renderHeader(decorators, animations)}
            <VelocityTransitionGroup {...animations.drawer} ref="velocity">
              {toggled ? this.renderChildren(decorators, animations) : null}
            </VelocityTransitionGroup>
          </li>
        );
    }
    renderHeader(decorators, animations){
        return (
            <NodeHeader
                decorators={decorators}
                animations={animations}
                style={this.props.style}
                node={this.props.node}
                onClick={this.onClick}
            />
        );
    }
    renderChildren(decorators){
        if(this.props.node.loading){ return this.renderLoading(decorators); }
        return (
            <ul style={this.props.style.subtree} ref="subtree">
              {
                rutils.children.map(this.props.node.children, (child, index) =>
                  <TreeNode
                      {...this._eventBubbles()}
                      key={index}
                      node={child}
                      decorators={this.props.decorators}
                      animations={this.props.animations}
                      style={this.props.style}
                  />)
              }
            </ul>
        );
    }
    renderLoading(decorators){
        return (
            <ul style={this.props.style.subtree}>
                <li>
                    <decorators.Loading style={this.props.style.loading}/>
                </li>
            </ul>
        );
    }
    _eventBubbles(){
        return { onToggle: this.props.onToggle };
    }
}

TreeNode.propTypes = {
    style: React.PropTypes.object.isRequired,
    node: React.PropTypes.object.isRequired,
    decorators: React.PropTypes.object.isRequired,
    animations: React.PropTypes.object.isRequired,
    onToggle: React.PropTypes.func
};

module.exports = TreeNode;
