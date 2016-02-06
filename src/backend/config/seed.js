var mongo = require('./mongo');
var seeder = require('mongoose-seeder');


mongo().then(function() {

    // Load Mongoose models
    seeder.seed(data).then(function() {
        process.exit();
    }).catch(function(error) {
        console.error(error);
    });
});

// Data array containing seed data - documents organized by Model
var data = {
    users: {
        '_model': 'Categories',
        'c1': { name: 'Ping pong' },
        'c2': { name: 'Meetups' },
        'c3': { name: 'Hackathons' },
        'c4': { name: 'Tech lecture' },
        'c5': { name: 'Startup lecture' },
        'c6': { name: 'After hours (party!!!)' },
        'c7': { name: 'Show and tell' }
    }
};