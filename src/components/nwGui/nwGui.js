// Load native UI library
var gui = require('nw.gui');

win = gui.Window.get();

// Create menu
var nativeMenuBar = new gui.Menu({ type: "menubar" });

// create MacBuiltin
nativeMenuBar.createMacBuiltin("nw-blog",{
  hideEdit: false,
  hideWindow: false
});

// Create sub-menu
var menuItems = new gui.Menu();
menuItems.append(new gui.MenuItem({ label: '配置node' }));
menuItems.append(new gui.MenuItem({ label: '配置hexo' }));

// Append MenuItem as a Submenu
var menu_conf = new gui.MenuItem({
  label: '配置环境',
  submenu: menuItems // menu elements from menuItems object
})
nativeMenuBar.append(menu_conf);

menuItems.items[0].click = function() {
  // win.close();
  alert("配置node");
};

menuItems.items[1].click = function() {
  // win.close();
  alert("配置hexo");
};

win.menu = nativeMenuBar;

try {
} catch (ex) {
  console.log(ex.message);
}
