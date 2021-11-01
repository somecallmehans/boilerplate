const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, './client')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', require('./routes'));

app.get('*', (req, res) => {
  if(req.path.endsWith('bundle.js')){
    res.sendFile(path.resolve(__dirname, '../public/bundle.js'));
  } else {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  }
})

app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Somethings wrong with the server.')
})

module.exports = app;
