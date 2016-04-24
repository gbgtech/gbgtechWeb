import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Redirect, IndexRoute, browserHistory } from 'react-router';


require('./style.css');
require('../../node_modules/quill/dist/quill.snow.css');
require('sweetalert/dist/sweetalert.css');

import store from './store/store';
import App from './components/App';
import UserApp from './components/UserApp';
import Post from './components/Post';
import NewsPage from './components/NewsPage';
import SinglePostPage from './components/SinglePostPage';

//Editors access
import Feed from './components/Feed';
import ListFeeds from './components/ListFeeds';


//Admin access
import AdminPage from './components/AdminPage';



const AppRoute = () => (
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
              <Route component={UserApp}>
                <IndexRoute component={NewsPage}/>
                <Route path="news/:postId" component={SinglePostPage} />
                <Route path="news/:postId/edit" component={Post} onEnter={requireAuth}/>
                <Route path="post" component={Post} onEnter={requireAuth}/>
              </Route>
              <Route path="feeds" component={ListFeeds} onEnter={requireAuth}/>
              <Route path="feed" component={Feed} onEnter={requireAuth}/>
              <Route path="feed/:feedId/edit" component={Feed} onEnter={requireAuth}/>

              <Route path="admin" component={AdminPage} onEnter={requireAuth}/>
              <Redirect from="*" to="/" />
            </Route>
        </Router>
    </Provider>
);

function requireAuth(nextState, replace) {
  if (!store.getState().signedIn) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname }
    });
  }
}

ReactDOM.render(<AppRoute/>, document.getElementById('root'));
