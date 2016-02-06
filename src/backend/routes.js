
var UsersController = require('./controller/users');
var CategoriesController = require('./controller/categories');
var PostsController = require('./controller/posts');


module.exports = function(app) {

    app.post('/api/users/create', UsersController.create);
    app.get('/api/categories', CategoriesController.index);
    app.get('/api/posts', PostsController.index);
    app.get('/api/posts/:id', PostsController.show);
};
