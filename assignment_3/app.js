const path = require('path');

const express = require('express');

const mainRoutes = require('./routes/main');
const userRoutes = require('./routes/users');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));


app.use(userRoutes);
app.use(mainRoutes);



app.listen(3000);
