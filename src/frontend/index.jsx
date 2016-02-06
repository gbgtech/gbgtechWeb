import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';


require('./style.css');
//require('../../node_modules/quill/dist/style.css');

import App from './App';
import Hello from './Hello';
import Post from './Post';
import NewsPage from './NewsPage';

const AppRoute = () => (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Hello}/>
            <Route path="news" component={NewsPage}/>
        </Route>
        <Route path="/post" component={App}>
            <IndexRoute component={Post}/>
        </Route>
    </Router>
);

ReactDOM.render(<AppRoute/>, document.getElementById('root'));
