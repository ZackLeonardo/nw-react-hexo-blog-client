// Load native UI library
var gui = require('nw.gui');

var win = gui.Window.get();

var docWindowOptions = {
  "new-instance": false,
  "show_in_taskbar":true,
  "toolbar":false,
  "show": true
};

// Create menu
var nativeMenuBar = new gui.Menu({ type: "menubar" });

// create MacBuiltin
nativeMenuBar.createMacBuiltin("nw-blog",{
  hideEdit: false,
  hideWindow: false
});

/*
 * conf_env
 */
// Create sub-menu
var menuItems_conf_env = new gui.Menu();
menuItems_conf_env.append(new gui.MenuItem({ label: '配置node环境' }));
menuItems_conf_env.append(new gui.MenuItem({ label: '配置hexo环境' }));

// Append MenuItem as a Submenu
var menu_conf_env = new gui.MenuItem({
  label: '环境配置',
  submenu: menuItems_conf_env // menu elements from menuItems object
})
nativeMenuBar.append(menu_conf_env);

menuItems_conf_env.items[0].click = function() {
  // win.close();
  alert("配置node环境");
};

menuItems_conf_env.items[1].click = function() {
  // win.close();
  alert("配置hexo环境");
};

/*
 * conf_hexo
 */
// Create sub-menu
var menuItems_conf_hexo = new gui.Menu();
menuItems_conf_hexo.append(new gui.MenuItem({ label: '初始化hexo' }));
menuItems_conf_hexo.append(new gui.MenuItem({ label: '配置hexo' }));

// Append MenuItem as a Submenu
var menu_conf_hexo = new gui.MenuItem({
  label: 'hexo配置',
  submenu: menuItems_conf_hexo // menu elements from menuItems object
})
nativeMenuBar.append(menu_conf_hexo);

menuItems_conf_hexo.items[0].click = function() {
  // win.close();
  alert("初始化hexo");
};

menuItems_conf_hexo.items[1].click = function() {
  window.open('http://www.ishadowsocks.com');
  win.close();
};

win.on('close', function() {
  this.hide(); // Pretend to be closed already
  console.log("We're closing...");
  this.close(true);
});



// // Release the 'win' object here after the new window is closed.
// win.on('closed', function() {
//   win = null;
// });

win.menu = nativeMenuBar;

try {
} catch (ex) {
  console.log(ex.message);
}
