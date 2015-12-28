'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {Treebeard} from './treeBeard';
// var PubSub = require('pubsub-js');
import PubSub from 'pubsub-js';

var MY_TOPIC = "mdinit";

var treeBeardLoadData = require('../../../src/components/backServer/files').treeBeardLoadData;

require('require-yaml');
var config = require('../../../config.yml');
var MDFilePath = config.hexoInit_path + "/source/_posts";

class TreeBeard extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
    this.onToggle = this.onToggle.bind(this);
  }
  onSubTreeToggled(node, toggled){
    // Store Toggle State
    node.toggled = toggled;
  }
  onToggle(node, toggled){
    if(this.state.cursor){
      this.state.cursor.active = false;
    }
    node.active = true;
    if(!node.terminal){
      this.onSubTreeToggled(node, toggled);
    }else{
      // window.alert(node.filePath);
      // window.alert(document.getElementById('app').innerHTML);

      // to dispatch
      // PubSub.publish('mdinit', this.props.path);
      PubSub.publish(MY_TOPIC, node.filePath);
    }
    this.setState({ cursor: node });
  }
  render(){
    return (
      <Treebeard
        data={treeBeardLoadData(this.props.path)}
        onToggle={this.onToggle}
      />
    );
  }
}

ReactDOM.render(<TreeBeard path = {MDFilePath}/>, document.getElementById('fileTree'));
