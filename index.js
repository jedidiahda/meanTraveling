require('dotenv').config();
require('./api/data/db');
const travelingRouter = require('./api/routes/traveling.route');
const transportationRouter = require('./api/routes/transportation.route');
const usersRouter = require('./api/routes/users.route');

const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api', function(req,res,next){
  res.header('Access-Control-Allow-Origin','http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
  res.setHeader('Access-Control-Allow-Headers','X-Requested-With,content-type,Authorization');
  next();
})

app.use('/api',travelingRouter);
app.use('/api',transportationRouter);
app.use('/api',usersRouter);

const server = app.listen(process.env.PORT,function(){
  console.log('app listen to port ', server.address().port);
})


