
var UsersController = require('./controller/users');


module.exports = function(app) {

    app.post('/api/users/create', UsersController.createUser);
};