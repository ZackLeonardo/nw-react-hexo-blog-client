'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {Treebeard} from './treeBeard';

const data = {
    name: 'root',
    toggled: true,
    children: [
        {
            name: 'parent',
            children: [
                {
                    name: 'child',
                    terminal: true
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
                            terminal: true
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
    }
    onToggle(/* node, toggled */){
        // ...
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

const content = document.getElementById('treeBeard');
ReactDOM.render(<TreeBeard />, content);
