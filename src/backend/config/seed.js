var seeder = require('mongoose-seed');
var config = require('./config');

// Connect to MongoDB via Mongoose
seeder.connect(config.db, function() {

    // Load Mongoose models
    seeder.loadModels([
        'src/backend/model/category.js',
        'src/backend/model/user.js',
        'src/backend/model/post.js'
    ]);

    // Clear specified collections
    seeder.clearModels(['Users', 'Categories'], function() {

        // Callback to populate DB once collections have been cleared
        seeder.populateModels(data);

    });
});

// Data array containing seed data - documents organized by Model
var data = [
    {
        'model': 'Categories',
        'documents': [
            { name: 'Ping pong' },
            { name: 'Meetups' },
            { name: 'Hackathons' },
            { name: 'Tech lecture' },
            { name: 'Startup lecture' },
            { name: 'After hours (party!!!)' },
            { name: 'Show and tell' }
        ]
    }
];