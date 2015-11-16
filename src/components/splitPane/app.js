import React from 'react';
import ReactDOM from 'react-dom';
import SplitPane from './SplitPane';

var Example = React.createClass({

  render: function () {
    return (
      <SplitPane split="vertical" minSize="50" defaultSize="100">
          <div></div>
          <div id='app'></div>
      </SplitPane>
    );
  }

});

ReactDOM.render(<Example />,
document.getElementById("container"));
