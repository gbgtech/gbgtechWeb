import React from 'react';

import EventsList from './EventsList';
import Twitter from './Twitter';

const RightColumn = React.createClass({

  render() {
    return (
      <div className="right-column">
        <EventsList />
        <Twitter path="search?q=%23gbgtech%20-RT" id="696282839873093633">#gbgtech</Twitter>
      </div>
    );
  }
});

export default RightColumn;
