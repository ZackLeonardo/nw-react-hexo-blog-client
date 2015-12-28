'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var gui = global.window.nwDispatcher.requireNwGui();

var addMenu;

var App = React.createClass({
    displayName: 'App',

    componentWillMount: function componentWillMount() {
        addMenu = new gui.Menu();
        addMenu.append(new gui.MenuItem({
            label: 'New File',
            click: function click() {
                // doSomething
                console.log('click New File button');
            }
        }));
        addMenu.append(new gui.MenuItem({
            label: 'Rename',
            click: function click() {
                // doSomething
                console.log('click Rename button');
            }
        }));
        addMenu.append(new gui.MenuItem({
            label: 'Delete',
            click: function click() {
                // doSomething
                console.log('click Delete button');
            }
        }));
    },

    contextMenu: function contextMenu(e) {
        e.preventDefault();
        addMenu.popup(e.clientX, e.clientY);
    },

    render: function render() {
        return React.createElement(
            'button',
            { onClick: this.handleClick, onContextMenu: this.contextMenu },
            'SomethingUseful'
        );
    }
});

module.exports = App;