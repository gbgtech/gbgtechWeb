var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

var App = require('./App.jsx');
var Hello = require('./Hello.jsx');
var World = require('./World.jsx');

ReactDOM.render((
    <Router>
        <Route path="/" component={App}>
            <IndexRoute path="" component={Hello}></IndexRoute>
            <Route path="world" component={World}></Route>
        </Route>
    </Router>
), document.getElementById('root'));
