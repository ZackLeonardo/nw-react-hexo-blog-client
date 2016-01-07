'use strict';

import React from 'react';
import rutils from 'react-utils';
import {VelocityTransitionGroup} from 'velocity-react';

import NodeHeader from './header';

var gui = global.window.nwDispatcher.requireNwGui();

var files = require('../../../../src/components/backServer/files');
var hexoCMD = require('../../../../src/components/backServer/hexo');

// 添加右键菜单
var addMenu;
var menuMount = function(filePath) {
  addMenu = new gui.Menu();
  addMenu.append(new gui.MenuItem({
    label: 'New File',
    click: function() {
      // add new md
      var newFileName=window.prompt("NEW FILE NAME:", "");
      if (newFileName != null && newFileName != ""){
        hexoCMD.hexoNewMD(files.getDirPath(filePath), newFileName);
        // 实现树的刷新
        var obj = document.getElementById(filePath);
        var newObj = obj.cloneNode(true);
        newObj.id = files.getDirPath(filePath) + newFileName + ".md";
        for (var i = 0 ; i < newObj.childNodes.length; i++){
          if (newObj.childNodes[i].tagName == "A"){
            for (var j = 0 ; j < newObj.childNodes[i].childNodes.length; j++){
              if (newObj.childNodes[i].childNodes[j].tagName == "DIV"){
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
    type: 'separator',
  }));
  addMenu.append(new gui.MenuItem({
    label: 'Rename',
    click: function() {
      // file rename
      var name = files.getFolderNameFromDir(filePath)
      var newName=window.prompt("CHANGE THE NAME:", name);
      if (newName != null && newName != "" && newName != name)
      {
        files.rename(filePath, newName);
      }else if (newName == name){
        console.log("same");
      }
      // 实现树的刷新
      var obj = document.getElementById(filePath);
      for (var i = 0 ; i < obj.childNodes.length; i++){
        if (obj.childNodes[i].tagName == "A"){
          for (var j = 0 ; j < obj.childNodes[i].childNodes.length; j++){
            if (obj.childNodes[i].childNodes[j].tagName == "DIV"){
              obj.childNodes[i].childNodes[j].childNodes[0].innerHTML = newName;
            }
          }
        }
      }
    }
  }));
  addMenu.append(new gui.MenuItem({
    label: 'Delete',
    click: function() {
      // delete file
      if (window.confirm('ARE YOU SURE?')){
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
}

var latestFilePath;

class TreeNode extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          toggled: props.node.toggled,
         };
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
        menuMount(e.currentTarget.id);
        addMenu.popup(e.clientX, e.clientY);
      }

    }
    onClick(){
      let toggled = !this.state.toggled;
      let onToggle = this.props.onToggle;
      if(onToggle){
        onToggle(this.props.node, toggled);
        if (this.props.node.terminal){
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
    setBorder(){
      if (latestFilePath){
        document.getElementById(latestFilePath).style.border=null;
      }
      latestFilePath = this.props.node.filePath;
      document.getElementById(latestFilePath).style.border="thin groove #0000FF";
      document.getElementById(latestFilePath).style.borderRadius="3px";
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
