if(process.env.NODE_ENV!="production"){
  require('dotenv').config();
}
var express = require('express');
var webpack = require('webpack');

var port = process.env.PORT || 3001;

var app = express();


require('./src/backend/config/express.js')(app);

app.listen({port: port, bind: '0.0.0.0'}, () => {
  console.log("Backend is on port "+ port);
});

app.use(express.static('./public'));
app.get('*', (req, res, next) => {
  res.sendFile('index.html', {root: './public'});
});
