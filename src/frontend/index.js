import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect, IndexRoute, browserHistory } from 'react-router';


import fetcher from './fetcher';

require('./style.css');
require('../../node_modules/quill/dist/quill.snow.css');

import App from './components/App';
import Hello from './components/Hello';
import Post from './components/Post';
import NewsPage from './components/NewsPage';
import SinglePostPage from './components/SinglePostPage';

const AppRoute = () => (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={NewsPage}/>
            <Route path="news/:postId" component={SinglePostPage} />
            <Route path="post" component={Post}/>
        </Route>
        <Redirect from="*" to="/" />
    </Router>
);

ReactDOM.render(<AppRoute/>, document.getElementById('root'));
