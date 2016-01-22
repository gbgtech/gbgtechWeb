import React  from 'react';
import TopMenu from './TopMenu';


var App = React.createClass({
    render() {

        return (
            <div className="main-body">
              <TopMenu />
                {this.props.children}
            </div>
        );
    }
});


module.exports = App;
