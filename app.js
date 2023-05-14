const path = require('path');

const mongoose = require('mongoose')
require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const User = require('./models/user')

app.use((req, res, next) => {
  User.findById('6460aa03734fc386ac2db4f3')
    .then(user => {
      req.user = user
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect(process.env.MONGODBURL)
  .then((result) => {
    User.findOne().
      then(user => {
        if (!user) {
          const user = new User({
            name: 'datta',
            email: 'datta@gmail.com'
          })
          user.save()
        }
      })
    app.listen(3000)
  })
  .catch((err) => {  
    console.log(err)
  })