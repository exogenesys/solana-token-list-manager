const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

const indexRouter = require('./routes/index');
const tokenListManagerRouter = require('./routes/webhook');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/token-list-manager/', tokenListManagerRouter);

module.exports = app;
