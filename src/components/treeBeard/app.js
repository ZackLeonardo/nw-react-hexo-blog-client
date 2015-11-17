'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {Treebeard} from './treeBeard';

const data = {
    name: 'root',
    children: [
        {
            name: 'parent',
            children: [
                {
                    name: 'child',
                    terminal: true,
                    filePath: 'root/parent/child'
                }
            ]
        },
        {
            name: 'loading parent',
            loading: true
        },
        {
            name: 'parent',
            children: [
                {
                    name: 'nested parent',
                    children: [
                        {
                            name: 'nested child',
                            terminal: true,
                            filePath: 'root/parent/nested parent/nested child'
                        }
                    ]
                }
            ]
        }
    ]
};



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
      window.alert(node.filePath);
    }
    this.setState({ cursor: node });

  }
  render(){
    return (
      <Treebeard
        data={data}
        onToggle={this.onToggle}
      />
    );
  }
}

ReactDOM.render(<TreeBeard />, document.getElementById('fileTree'));
