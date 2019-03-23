const express = require('express');

const app = express();

app.use('/users', (req, res, next) => {
  console.log('in users path');
  res.send('<h1>users page</h1>');
});

app.use('/', (req, res, next) => {
  console.log('in root view');
  res.send('<h1>root page</h1>');
});

app.listen(3000);