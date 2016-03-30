import React from 'react';


import Twitter from './Twitter';

const RightColumn = React.createClass({

  render() {
    return (
      <div className="right-column">
        <Twitter path="search?q=%23gbgtech%20-RT" id="696282839873093633">#gbgtech tweets</Twitter>
      </div>
    );
  }
});

export default RightColumn;
