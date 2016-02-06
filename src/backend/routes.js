
var UsersController = require('./controller/users');
var CategoriesController = require('./controller/categories');


module.exports = function(app) {

    app.post('/api/users/create', UsersController.createUser);
    app.get('/api/categories', CategoriesController.index);
};