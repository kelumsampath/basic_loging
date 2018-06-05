const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const app = express();
const user = require('./routes/users');
const config = require('./config/database');
const port = 3000;
app.use(cors());

app.use(express.static(path.join(__dirname,'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
//require('./config/passport')(passport);

const connection = mongoose.connect(config.database);

mongoose.connection.on('connected', function () {  
  console.log('Mongoose default connection open to:'+config.database);
}); 
mongoose.connection.on('error',function (err) {  
  console.log('Mongoose default connection error: ' + err);
}); 

app.use('/user',user);

app.get('/',(req,res)=>
  res.send('Hello world!'))

app.listen(port,(req,res)=>
  console.log('listening to port:'+port))