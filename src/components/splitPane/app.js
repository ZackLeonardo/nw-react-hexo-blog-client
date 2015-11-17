import React from 'react';
import ReactDOM from 'react-dom';
import SplitPane from './SplitPane';

var Example = React.createClass({

  render: function () {
    return (
      <SplitPane split="vertical" minSize="60" defaultSize="150">
          <div id='fileTree' className="leftMenu"></div>
          <div id='app' className="rightContent"></div>
      </SplitPane>
    );
  }

});

ReactDOM.render(<Example />,
document.getElementById("container"));
