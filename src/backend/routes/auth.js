var authController = require('../controller/auth.js');

module.exports = function(app) {
    app.post('/api/auth/email/request', authController.RequestEmail);
    app.get('/api/auth/email/signin/:token', authController.SigninEmail);

    app.get('/api/auth/signout', authController.Signout);
    app.get('/api/auth/user', authController.Test);

    /*
    /api/auth/google
    /api/auth/googleCallback
    */
}
