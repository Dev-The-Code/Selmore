const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const http = require('http');
const app = express();
const mongoose = require('mongoose');
const router = require('./router')
const cors = require('cors');

//App setup
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({type:'*/*'}));
app.use(bodyParser.urlencoded({ extended: true }));
router(app);

// //database Development
var configDB = require('./config/database.js');
mongoose.connect(configDB.EvenNodeDB,{ useNewUrlParser: true },function(err,db){
  if(err){
      console.log(err);
      db.on('error', console.error.bind(console, 'Database connection failed:'));
  }
  else {
    var db = mongoose.connection;
      console.log("Database :: selmore :: connection established successfully.");
      //db.close();
  }
})

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});
app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

//Server setup
const port = process.env.PORT || 5000;
const server = http.createServer(app);
//server.listen(port);
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}
app.listen(port, () => console.log(`Listening on port ${port}`));
