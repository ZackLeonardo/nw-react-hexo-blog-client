// Load native UI library
// var gui = require('nw.gui');
var gui = global.window.nwDispatcher.requireNwGui();

var win = gui.Window.get();
var win_hexo_init;
var win_hexo_conf;

var winOptions = {
  position: 'center',
  // width: Window.width,
  // height: Window.height,
  width: 800,
  height: 600,
  toolbar: false,
  focus: true
};

var listChildrenWins = new Array();
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
  alert(window.navigator.language);
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
  // alert("初始化hexo");
  if (win_hexo_init){
    return;
  }
  win_hexo_init = gui.Window.open('hexoInit.html', winOptions);
  win_hexo_init.on('close', function() {
    // this.hide();
    // console.log("win_hexo_init is closing...");
    this.close(true);
  });
  win_hexo_init.on('closed', function() {
    win_hexo_init = null;
  });
};

menuItems_conf_hexo.items[1].click = function() {
// alert("hexo配置");
  if (win_hexo_conf){
    return;
  }
  win_hexo_conf = gui.Window.open('hexoConfig.html', winOptions);
  win_hexo_conf.on('close', function() {
    // this.hide();
    // console.log("win_hexo_init is closing...");
    this.close(true);
  });
  win_hexo_conf.on('closed', function() {
    win_hexo_conf = null;
  });
};

win.on('new-win-policy', function(frame, url, policy) {
  console.log("new-win-policy called: " + url);
  // policy.forceCurrent(); //加上这个你就可以在一个页面打开不同链接啦！force the link to be opened in the same frame
});

win.on('close', function() {
  this.hide(); // Pretend to be closed already
  console.log("We're closing...");
  // If the new window is still open then close it.
  if (win_hexo_init != null)
    win_hexo_init.close(true);
  if (win_hexo_conf != null)
    win_hexo_conf.close(true);
  this.close(true);
});

win.on('closed', function() {
  win = null;
});

win.menu = nativeMenuBar;
