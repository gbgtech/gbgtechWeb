import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';

var App = require('./App');
var Hello = require('./Hello');
var World = require('./World');



const AppRoute = () => (
    <Router>
        <Route path="/" component={App}>
            <IndexRoute component={Hello}/>
            <Route path="world" component={World}/>
        </Route>
    </Router>
);

ReactDOM.render(<AppRoute/>, document.getElementById('root'));
