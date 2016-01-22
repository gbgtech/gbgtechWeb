import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';


require('./style.css');

import App from './App';
import Hello from './Hello';

const AppRoute = () => (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Hello}/>
        </Route>
    </Router>
);

ReactDOM.render(<AppRoute/>, document.getElementById('root'));
