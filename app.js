var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Import the router for the index route
var indexRouter = require('./routes/index');
// Import the router for the users route
var usersRouter = require('./routes/users');

// Init the express app
var app = express();

// Set up the view using the express-handlebars
const exphbs = require('express-handlebars');
// Setup Handlebars to use .hbs as the file ext for views
app.engine('hbs', exphbs.engine({ extname: 'hbs' }));
// Set the view engine to hbs
app.set('view engine', 'hbs');

// Use the logger middleware in dev mode
app.use(logger('dev'));
// Parse JSON reqs
app.use(express.json());
// Parse URL-encoded payloads
app.use(express.urlencoded({ extended: false }));
// Parse cookies attached to the client request object
app.use(cookieParser());
// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// Define the route for '/users' using the users router
app.use('/users', usersRouter);

// Catch 404 errors and forward them to the error handler, 
// Also this stopped my site from crashing when using random website directories like /random or just a misspelled one.
// I found this and encorperated it mainly because I actually want to use this portfolio for potential jobs or even just CO-OPs, and these small details matter. 
app.use(function(req, res, next) {
  res.status(404).render('error', {
    title: '404 - Page Not Found',
    message: 'Oops! The page you are looking for does not exist.',
    status: 404
  });
});

// Error handler middleware
app.use(function(err, req, res, next) {
  // Set local variables; provide error details only in dev mode
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page with the appropriate  code
  res.status(err.status || 500);
  res.render('error');
});

// Export the app module for use in other parts of the app
module.exports = app;
