import React from 'react';


import Twitter from './Twitter';

const RightColumn = React.createClass({

    render() {
        return (
            <div className="right-column">
                <Twitter path="hashtag/gbgtech" id="690568248279109633">#gbgtech tweets</Twitter>
            </div>
        );
    }
});

export default RightColumn;
