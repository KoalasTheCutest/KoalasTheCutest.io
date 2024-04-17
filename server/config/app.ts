import createError from 'http-errors';
import express, {NextFunction} from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from "mongoose";

import indexRouter from '../routes';
import usersRouter from '../routes/users';

import session from 'express-session';      // cookie-based session
import passport from 'passport';            // authentication support
import passportLocal from 'passport-local';  // authentication strategy BASIC (username/password)
import flash from 'connect-flash';           // authentication messaging

let localStrategy = passportLocal.Strategy;
import User from '../models/user';

const app = express();

import * as DBConfig from './db'; // DBconfig is an alias
mongoose.connect(DBConfig.URI);
const db = mongoose.connection;

db.on('error', function(){
  console.error("Connection Error: failed to connect to database.");
});

db.on('open', function(){
  console.log(`Connected to MongoDB at ${DBConfig.HostName}`);
});

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// STATIC CONFIGURATION
app.use(express.static(path.join(__dirname, "../../client")));      // serve static files from 'client' directory
app.use(express.static(path.join(__dirname, "../../node_modules"))); // serve static files from 'node_modules' directory

app.use(session ({
      secret: DBConfig.SessionSecret,
      saveUninitialized: false,
      resave: false
    }
));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy()); // bind our user collection to our local strategy

passport.serializeUser(User.serializeUser()); // ** this is the line that requires node modules editing
// 1. node modules --> @types --> passport --> index.d.ts --> line 468 (User: express.user) --> change one character
// --> accept "just this file" , just change User: express.User to User:any

//

passport.deserializeUser(User.deserializeUser());

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err : createError.HttpError, req : express.Request,
                 res : express.Response, next : NextFunction) {

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
