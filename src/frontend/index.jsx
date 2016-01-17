var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

var App = require('./App');
var Hello = require('./Hello');
var World = require('./World');

ReactDOM.render((
    <Router>
        <Route path="/" component={App}>
            <IndexRoute path="" component={Hello}></IndexRoute>
            <Route path="world" component={World}></Route>
        </Route>
    </Router>
), document.getElementById('root'));
