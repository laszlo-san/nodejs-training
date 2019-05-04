const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const dbUrl = require('./util/dbCredentials').mongoUrlUserPass;

const errorController = require('./controllers/error');
// const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//   User.findById('5ccab7668044a02263128afa')
//     .then(user => {
//       req.user = new User(user.name, user.email, user.cart, user._id);
//       next();
//     })
//     .catch(err => console.log(err));
// });

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// remove warning flag for mmongodb url parser being depraceted
mongoose.set('useNewUrlParser', true);

mongoose
  .connect(dbUrl)
  .then(() => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
