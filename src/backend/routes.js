
var UsersController = require('./controller/users');
var CategoriesController = require('./controller/categories');
var PostsController = require('./controller/posts');
var EventsController = require('./controller/events');
var FeedController = require('./controller/feed');
var authRoutes = require('./routes/auth');
var Meetup = require('./integration/meetup');

module.exports = function(app) {
    authRoutes(app);

    app.post('/api/users/create', UsersController.create);

    app.get('/api/categories', CategoriesController.index);

    app.get('/api/posts', PostsController.index);
    app.get('/api/posts/:id', PostsController.show);
    app.post('/api/posts/create', PostsController.create);

    app.get('/api/events', EventsController.googleCalendar);
    app.get('/api/meetup', Meetup.fetchMeetupEvents);

    //Need editor access
    app.get('/api/feeds', FeedController.index);
    app.post('/api/feeds/create', FeedController.create);


    //Need admin access
};
