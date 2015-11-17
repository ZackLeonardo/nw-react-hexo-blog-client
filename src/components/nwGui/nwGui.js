var gui = require('nw.gui');

// // Standard way of creating elements
// // var element = new gui.ElementName(option);
//
// // Example of creating a menu
// var menu = new gui.Menu({ title: 'Menu Title' });
//
// menu.title = 'New Title';
// console.log('Menu title is', menu.title);
//
// // menu.append(new gui.MenuItem({ label: 'Im an item' }));
// // menu.removeAt(0);
//
// menuitem.on('click', function() {
//   console.log('Item is clicked');
// });

win = gui.Window.get();
var nativeMenuBar = new gui.Menu({ type: "menubar" });
try {
  nativeMenuBar.createMacBuiltin("nw-blog");
  win.menu = nativeMenuBar;
} catch (ex) {
  console.log(ex.message);
}
