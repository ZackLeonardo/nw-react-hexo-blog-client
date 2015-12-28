'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var gui = global.window.nwDispatcher.requireNwGui();

var addMenu;

var App = React.createClass({

  componentWillMount: function() {
    addMenu = new gui.Menu();
    addMenu.append(new gui.MenuItem({
        label: 'New File',
        click: function() {
            // doSomething
            console.log('click New File button');
        }
    }));
    addMenu.append(new gui.MenuItem({
        label: 'Rename',
        click: function() {
            // doSomething
            console.log('click Rename button');
        }
    }));
    addMenu.append(new gui.MenuItem({
        label: 'Delete',
        click: function() {
            // doSomething
            console.log('click Delete button');
        }
    }));
  },

  contextMenu: function(e) {
      e.preventDefault();
      addMenu.popup(e.clientX, e.clientY);
  },

  render: function(){
      return <button onClick={this.handleClick} onContextMenu={this.contextMenu}>SomethingUseful</button>
  }
});

ReactDOM.render(<App />, document.getElementById('treeBeard'));
