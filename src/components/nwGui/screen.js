var gui = require('nw.gui');
gui.Screen.Init(); // you only need to call this once
gui.Screen.chooseDesktopMedia(["window","screen"],
  function(streamId) {
    var vid_constraint = {
      mandatory: {
        chromeMediaSource: 'desktop',
        chromeMediaSourceId: streamId,
        maxWidth: 1920,
        maxHeight: 1080
      },
      optional: []
    };
    navigator.webkitGetUserMedia({audio: false, video: constraint}, success_func, fallback_func);
  }
);
