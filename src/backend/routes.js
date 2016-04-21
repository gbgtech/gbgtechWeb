var UsersController = require('./controller/users');
var CategoriesController = require('./controller/categories');
var PostsController = require('./controller/posts');
var FeedController = require('./controller/feed');
var authRoutes = require('./routes/auth');
//var Meetup = require('./providers/meetup');

var hasRole = require('./controller/auth').HasRole;
var roles = require('./controller/auth').Roles;

module.exports = function (app) {
  authRoutes(app);

  app.post('/api/test', hasRole(roles.user), CategoriesController.test);

  app.get('/api/users/me', hasRole(roles.user), UsersController.me);

  app.post('/api/users/create', UsersController.create);

  app.get('/api/categories', CategoriesController.index);

  app.get('/api/posts', PostsController.index);
  app.get('/api/posts/:id', PostsController.show);
  app.put('/api/posts/:id', hasRole(roles.user), PostsController.update);
  app.post('/api/posts/create', hasRole(roles.user), PostsController.create);
  app.put('/api/posts/:id/accepted', hasRole(roles.user), PostsController.updateAccepted);

  app.get('/api/events', PostsController.listEvents);
  //fetchMeetupEvents  app.get('/api/meetup', Meetup.fetcfetchMeetupEventshMeetupEvents);

  app.get('/api/reddit', PostsController.postToOutlets);

  //Need editor access
  app.get('/api/feeds', hasRole(roles.editor), FeedController.index);
  app.put('/api/feeds/:id', hasRole(roles.editor), FeedController.update);
  app.get('/api/feeds/:id', hasRole(roles.editor), FeedController.show);

  app.post('/api/feeds/create', hasRole(roles.editor), FeedController.create);

  //Need admin access
};
