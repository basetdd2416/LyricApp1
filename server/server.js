const express = require('express');
const models = require('./models');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const schema = require('./schema/schema');
var logger = require('morgan');
const {tester} = require('graphql-tester');
const app = express();
// Replace with your mongoLab URI const MONGO_URI =
// 'mongodb://blue:blue@ds157479.mlab.com:57479/lyricaldb2';
const MONGO_URI = 'mongodb://blue:blue@ds157479.mlab.com:57479/lyricaldb2';
if (!MONGO_URI) {
  throw new Error('You must provide a MongoLab URI');
}
app.use(logger('dev'));
mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI);
mongoose
  .connection
  .once('open', () => console.log('Connected to MongoLab instance.'))
  .on('error', error => console.log('Error connecting to MongoLab:', error));

app.use(bodyParser.json());
app.use('/graphql', expressGraphQL({schema, graphiql: true}));
if (process.env.NODE_ENV !== 'production') {
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpack = require('webpack');
  const webpackConfig = require('../webpack.config.js');
  app.use(webpackMiddleware(webpack(webpackConfig)));
} else {
  app.use(express.static('dist'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  })
}

var myLogger = function (req, res, next) {
  console.log('LOGGED')
  next()
}

app.use(myLogger)

module.exports = app;
