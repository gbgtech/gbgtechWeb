import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';


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
            <IndexRoute component={Hello}/>
            <Route path="news" component={NewsPage}/>
            <Route path="news/:postId" component={SinglePostPage} />
            <Route path="post" component={Post}/>
        </Route>
    </Router>
);

ReactDOM.render(<AppRoute/>, document.getElementById('root'));
