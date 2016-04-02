var mongoose = require('mongoose');
var config = require('./config');
var seeder = require('mongoose-seeder');
var slugify = require('speakingurl');
var fs = require('fs');

var modelDir = './src/backend/model';

fs.readdirSync(modelDir).forEach((modelPath) => {
  console.log(modelDir + '/' + modelPath);
  require('../model/' + modelPath);
});

mongoose.connect(config.db, function(err) {
    // Load Mongoose models
    seeder.seed(data).then(() => {
        process.exit();
    }).catch((error) => {
        console.error(error);
    });
});

// Data array containing seed data - documents organized by Model
var data = {
    users: {
        '_model': 'Users',
        'admin': { email: 'admin@gbgtech.co', provider: 'email' },
        'bark': { email: 'erikaxelsson1@gmail.com', provider: 'email' }
    },
    categories: {
        '_model': 'Categories',
        'c1': { description:"Learn abute a new framework or language", name: 'Tech talk' },
        'c2': { description:"Hear the storys from great entrepreneurs", name: 'Startup talk' },
        'c3': { description:"Startups explains what they do", name: 'Show and tell' },
        'c4': { description:"Meet and build some thing cool", name: 'Hackathons' },
        'c5': { description:"Who writes abute what", name: 'In the spotligth' },
        'c6': { description:"Party?", name: 'After hours' },
        'c7': { description:"Meet new perssons", name: 'Network' }
    },
    posts: {
        '_model': 'Posts',
        'p1': {
            slug: slugify('Startup Ping pong tournament'),
            title: 'Startup Ping pong tournament',
            organizer: 'StartupPingPong AB',
            accepted: 'APPROVED',
            author: '->users.admin',
            body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            url: 'https://google.com',
            categories: ['->categories.c1', '->categories.c5'],
            eventData: {
                from: '=new Date(2016, 4, 6, 13, 37)',
                to: '=new Date(2016, 4, 6, 17, 0)',
                rsvp: 'http://splashthat.com',
                location: {
                    lat: '57.7166056',
                    lng: '12.0061702',
                    name: 'Hubben 2.1'
                }
            }
        }
    },
    feeds:{
      '_model': 'Feeds',
      'f1':{
        userId: '->users.bark',
        categories: ['->categories.c1'],
        name:"Javaforum",
        acceptedDefault:'WAITING',
        uniqueId:'Javaforum-Goteborg',
        vendor:"meetup"
      },
      'f2':{
        userId: '->users.bark',
        categories: ['->categories.c2', '->categories.c3'],
        name:"gbgtartup",
        acceptedDefault:'WAITING',
        uniqueId:'gbgtartup',
        vendor:"meetup"
      },
      'f3':{
        userId: '->users.bark',
        categories: ['->categories.c2', '->categories.c6'],
        name:"Startup-Grind",
        acceptedDefault:'WAITING',
        uniqueId:'Startup-Grind-Gothenburg',
        vendor:"meetup"
      },
      'f4':{
        userId: '->users.bark',
        categories: ['->categories.c2', '->categories.c6'],
        name:"HUBGothenburg",
        acceptedDefault:'WAITING',
        uniqueId:'HUBGothenburg',
        vendor:"meetup"
      },
      'f5':{
        userId: '->users.bark',
        categories: ['->categories.c4'],
        name:"Hackathons-Goteborg",
        acceptedDefault:'WAITING',
        uniqueId:'Hackathons-Goteborg',
        vendor:"meetup"
      },

      'f6':{
        userId: '->users.bark',
        categories: ['->categories.c4'],
        name:"Entrepreneurial hive",
        acceptedDefault:'WAITING',
        uniqueId:'Entrepreneurial-Hive',
        vendor:"meetup"
      },
      'f7':{
        userId: '->users.bark',
        categories: ['->categories.c4'],
        name:"Entrepreneurial hive",
        acceptedDefault:'WAITING',
        uniqueId:'Entrepreneurial-Hive',
        vendor:"meetup"
      },
      'f8':{
        userId: '->users.bark',
        categories: ['->categories.c4'],
        name:"Goteborg Startup Founder 101",
        acceptedDefault:'WAITING',
        uniqueId:'Goteborg-Startup-Founder-101',
        vendor:"meetup"
      },




    },

};
