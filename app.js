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

// const User = require('./models/user')

// app.use((req, res, next) => {
//   User.findById('645b8a664ad8c7fd0cd64dc7')
//     .then(user => {
//       req.user = new User(user.name, user.email, user.cart, user._id);
//       next();
//     })
//     .catch(err => console.log(err));
// });

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect(process.env.MONGODBURL)  
.then((result)=>{
  app.listen(3000)
})
.catch((err)=>{
  console.log(err)
})