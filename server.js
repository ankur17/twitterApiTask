var express = require('express');
var app = express();
var compression = require('compression')

//setup app scope variables
require('./app/globals')();

//grab routes and services
var routes = require(_dir.DIR_APP + '/routes');
var services = require(_dir.DIR_SERVICES);

var passport = services.PassportService.setup(function(user,callback){
    if( !user || !user.email ) {
      callback('You are not authorized to access the site');
    }else{
      services.UserService.authorize(user,callback);
    }
});

var bodyParser = require('body-parser');


app.use(require('express-session')({
    cookie: {
        path: '/',
        maxAge: null
    },
    secret: '96D9AF0C904D5',
    resave: true,
    saveUninitialized: false
}));

app.set('view engine', 'ejs');
app.use(require('cookie-parser')());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(passport.initialize());
app.use(passport.session());
process.on('uncaughtException', function (err) {
  console.log(err);
});


app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send('error');
    console.log(err);
});

// load our routes and pass in our app
routes(app, passport);

// launch ======================================================================
var port = _config.port;
var server = app.listen(port);
console.log('Your destiny lies on port ' + port);
console.log('http://localhost:' + port);

// ====================================

//
// var redis = require('redis');
// var client = redis.createClient(port, 'localhost', {no_ready_check: true});
// client.auth('password', function (err) {
//     if (err) throw err;
// });
//
// client.on('connect', function() {
//     console.log('Connected to Redis');
// });
