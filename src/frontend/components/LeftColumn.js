import React from 'react';

import EventsList from './EventsList';

const LeftColumn = React.createClass({

  render() {
    return (
      <div className="left-column">
        Coming up:<br />
        <EventsList />
      </div>
    );
  }
});

export default LeftColumn;
