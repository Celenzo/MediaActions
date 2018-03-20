var bodyParser      = require('body-parser');
var cookieParser    = require('cookie-parser');
var express         = require('express');
var favicon         = require('serve-favicon');
var mongoose        = require('mongoose');
var multer          = require('multer');
var logger          = require('morgan');
var path            = require('path');
var upload          = multer({ dest: 'public/uploads/' })

process.env.PUBLISHABLE_KEY = "pk_test_ZJLG415DZJo8y12cI829uctz";
process.env.SECRET_KEY = "sk_test_VUqtqxDUiVKKvNjw4nKX0vqf";

var contact = require('./routes/contact');
var gallery = require('./routes/gallery');
var api = require('./routes/api');
var hub     = require('./routes/hub');
var index   = require('./routes/index');
var login   = require('./routes/login');
var stripe  = require('./routes/stripe');
var profil = require('./routes/profil');


var app     = express();
var mongoDB = 'mongodb://admin:admin@ds239117.mlab.com:39117/db_media_actions';
//var mongoDB = 'mongodb://localhost:27017/node-auth'
mongoose.Promise = global.Promise;
mongoose.connect(mongoDB);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth2').Strategy;

var User = require('./models/users');
app.listen(4567);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'pug');
app.set('view engine', 'ejs')


app.use(require('express-session') ({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));

app.use(bodyParser.urlencoded({
    parameterLimit: 100000,
    limit: '50mb',
    extended: true
}));

app.use(passport.initialize());
app.use(passport.session());
var publicDir = require('path').join(__dirname,'/public');
app.use(express.static(publicDir));
/*passport.use(new LocalStrategy(function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.verifyPassword(password)) { return done(null, false); }
        return done(null, user);
    });
}));*/
passport.use(new LocalStrategy(
    function(username, password, cb) {
User.findOne({username: username }, function (err, user) {
    if (err) {
        console.log("error");
        return (err);
    }
    else
    {
        console.log("ca marche");
        if (!user) {
            app.use('/', login);
            //return cb("login", false, {message: 'Incorrect username.'});
        }

        if (!user.validPassword(password)) {
            return cb(null, false, {message: 'Incorrect Password.'});
        }
        return (cb(null, user));
    }
})
}
));
passport.use(new GoogleStrategy({
        clientID: "276874932016-c92hlcs1csbs06vsim60gslhbjb2duv2.apps.googleusercontent.com",
        clientSecret: "TOLJWIHjx0HdCa6i4zQehQUJ",
        callbackURL: "http://localhost:3000/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
        User.findOne({ 'google.id' : profile.id } , function (err, user) {
            if (err) {
                return cb(err);
            }
            if (!user) {
                console.log(typeof profile._json);
                user = new User({username: profile.displayName,
                    provider: 'google',
                    google:profile._json
                });
                user.save(function(err) {
                    if (err) console.log(err);
                    return cb(err, user);
                });
            } else {

                return cb(err, user);
            }
        });
    }
));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Urls et .js associés
app.use('/', index);
app.use('/', login);
app.use('/', hub);
app.use('/', gallery);
app.use('/stripe', stripe);
app.use('/api', api);
app.use('/', contact);
app.use('/', profil);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//MongoDB


  //Field name and max count

//

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  console.error(err);
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
