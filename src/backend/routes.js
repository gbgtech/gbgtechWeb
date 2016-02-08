
var UsersController = require('./controller/users');
var CategoriesController = require('./controller/categories');
var PostsController = require('./controller/posts');
var EventsController = require('./controller/events');


module.exports = function(app) {

    app.post('/api/users/create', UsersController.create);

    app.get('/api/categories', CategoriesController.index);

    app.get('/api/posts', PostsController.index);
    app.get('/api/posts/:id', PostsController.show);
    app.post('/api/posts/create', PostsController.create);

    app.get('/api/events', EventsController.googleCalendar)
};
