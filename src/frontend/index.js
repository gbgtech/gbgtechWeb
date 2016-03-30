import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect, IndexRoute, browserHistory } from 'react-router';


require('./style.css');
require('../../node_modules/quill/dist/quill.snow.css');

import App from './components/App';
import Post from './components/Post';
import NewsPage from './components/NewsPage';
import SinglePostPage from './components/SinglePostPage';

//Editors access
import AddFeed from './components/addFeed';

//Admin access



const AppRoute = () => (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={NewsPage}/>
            <Route path="news/:postId" component={SinglePostPage} />
            <Route path="news/:postId/edit" component={Post}/>
            <Route path="post" component={Post}/>
            <Route path="addFeed" component={AddFeed}/>
        </Route>
        <Redirect from="*" to="/" />
    </Router>
);

ReactDOM.render(<AppRoute/>, document.getElementById('root'));
