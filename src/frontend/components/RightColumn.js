import React from 'react';

import EventsList from './EventsList';
import TwitterFeed from './TwitterFeed';

const RightColumn = React.createClass({

  render() {
    return (
      <div className="right-column">
        <EventsList />
        <TwitterFeed path="search?q=%23gbgtech%20-RT" id="696282839873093633">#gbgtech</TwitterFeed>
      </div>
    );
  }
});

export default RightColumn;
