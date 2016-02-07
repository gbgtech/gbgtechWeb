import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';


import fetcher from './fetcher';

require('./style.css');
require('../../node_modules/quill/dist/quill.snow.css');

import App from './App';
import Hello from './Hello';
import Post from './Post';
import NewsPage from './NewsPage';
import SinglePostPage from './SinglePostPage';

const AppRoute = () => (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Hello}/>
            <Route path="news" component={NewsPage}/>
            <Route path="news/:postId" component={SinglePostPage} />
            <Route path="post" component={Post}/>
        </Route>
    </Router>
);

ReactDOM.render(<AppRoute/>, document.getElementById('root'));
