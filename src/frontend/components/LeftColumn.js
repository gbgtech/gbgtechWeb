import React from 'react';

import EventsList from './EventsList';

const LeftColumn = React.createClass({

  render() {
    return (
      <div className="left-column">
        <EventsList />
      </div>
    );
  }
});

export default LeftColumn;
