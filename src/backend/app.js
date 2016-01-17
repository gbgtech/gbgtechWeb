var express = require('express');
var app = express();

app.get('/api', function (req, res) {
  res.send('Hello World!');
});

app.use(express.static('build'));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})
