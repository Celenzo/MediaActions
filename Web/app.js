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
var hub     = require('./routes/hub');
var index   = require('./routes/index');
var login   = require('./routes/login');
var stripe  = require('./routes/stripe');

var app     = express();
var mongoDB = 'mongodb://admin:admin@ds239117.mlab.com:39117/db_media_actions';
mongoose.connect(mongoDB);

app.listen(4567);

//////////Test contact//////////
const nodemailer = require('nodemailer');

///////////////

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'pug');
app.set('view engine', 'ejs')

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
app.use('/', contact);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//MongoDB
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


  //Field name and max count

//

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
