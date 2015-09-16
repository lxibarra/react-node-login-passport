var express = require('express'),
    bodyParser = require('body-parser'),
    routes = require('./routes/index'),
    passport = require('passport'),
    mongoose = require('mongoose'),
    session = require('express-session'),
    mongoStore = require('connect-mongo')(session),
    config = require('./configuration/settings.js');
    console.log(config);
    mongoose.connect(config.mongodbInstance  + config.mongoDatabase);
    mongoose.connection.on('error', function (err) {
        console.error('Mongodb connection error: ' + err);
        process.exit(-1);
    });

var app = express();
app.use(require('cookie-parser')());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set('port', config.httpPort);
app.set('view engine', 'jade');
app.set('views', 'views');
app.use(session(
    {
        secret: config.appSecret,
        //cookie name
        key:config.cookieName,
        resave: false,
        //setting this to true will create a cookie even if the user has not yet signed in.
        saveUninitialized: false,
        cookie: { maxAge:60000 * 2  },
        //by default session is saved in memory but since we specify a mongodb connection then is moved
        store:new mongoStore({
            mongooseConnection:mongoose.connection,
            db:config.mongoDatabase,
            //to manage expiration
            autoRemove:'interval',
            autoRemoveInterval:10
            //complete documentation
            //https://www.npmjs.com/package/connect-mongo
        })
    }
));

app.use(passport.initialize());
app.use(passport.session());
routes.router(app);

var server = app.listen(app.get('port'), function () {
    var host = server.address();
    console.log('Server at localhost:', host.port);
});

