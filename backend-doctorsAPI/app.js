var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose
  .connect(
    'mongodb+srv://rkravikr9102:ravi9102@cluster0.ks6f15g.mongodb.net/',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'doctor',
    }
  )
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err.message);
  });

var indexRouter = require('./routes/index');
var doctorRoutes = require('./routes/doctorRoutes.js');
var patientRoutes = require('./routes/patientRoutes.js');

var app = express();

app.use(
  cors({
    origin: '*',
  })
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/doctor/register', doctorRoutes);
app.use('/api/patient', patientRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
