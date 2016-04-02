
var UsersController = require('./controller/users');
var CategoriesController = require('./controller/categories');
var PostsController = require('./controller/posts');
var FeedController = require('./controller/feed');
var authRoutes = require('./routes/auth');
var Meetup = require('./integration/meetup');

var loginCheck =function (req, res,next){
  console.log();
  if(req.user!=null){
    next();
  }else{
    res.send('need to login');
  }
};



module.exports = function(app) {
    authRoutes(app);

    app.post('/api/test', CategoriesController.test);


    app.post('/api/users/create', UsersController.create);

    app.get('/api/categories', CategoriesController.index);

    app.get('/api/posts', PostsController.index);
    app.get('/api/posts/:id', PostsController.show);
    app.put('/api/posts/:id', PostsController.update);
    app.post('/api/posts/create', PostsController.create);

    app.get('/api/events', PostsController.listEvents);
    app.get('/api/meetup', Meetup.fetchMeetupEvents);

    app.get('/api/reddit', PostsController.postToOutlets);


    //Need editor access
    app.get('/api/feeds',loginCheck, FeedController.index);
    app.post('/api/feeds/create',loginCheck, FeedController.create);


    //Need admin access
};
