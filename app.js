var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();

// mongoDB init
var mongoDB = require('./db/connect');
mongoDB.initMongoDB(() => {
  var articles = require('./db/articles');
  articles.createCollection(() => {
    const dataRow = {
      myId: 1,
      subject: 'subject 444',
      header: 'header 11',
      body: 'body 11'
    };
    articles.createOne(dataRow);
    dataRow.body = 'body UPDATED';
    dataRow.subject = 'subject UPDATED';
    delete dataRow._id;
    articles.updateOne(dataRow);
    articles.find().then((result) => {
      userDetails = result;
      console.log("articles.find result", result);
    }, function(err) {
      console.log('articles.find ERR', err);
    })
  });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

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
