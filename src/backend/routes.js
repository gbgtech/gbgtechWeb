
var UsersController = require('./controller/users');
var CategoriesController = require('./controller/categories');
var authRoutes = require('./routes/auth.js');

module.exports = function(app) {
    authRoutes(app);
    
    app.post('/api/users/create', UsersController.createUser);
    app.get('/api/categories', CategoriesController.index);
};
