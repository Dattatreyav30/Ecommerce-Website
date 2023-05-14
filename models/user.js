
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true
  },
  cart: {
    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true }
      }
    ]
  }
})

userSchema.methods.addToCart = function (product) {

  const cartProductIndex = this.cart.items.findIndex(cp => {
    return cp.productId.toString() === product._id.toString()
  })
  let newQuantity = 1;
  const updatedCartItems = [...this.cart.items]

  if (cartProductIndex >= 0) {
    newQuantity = this.cart.items[cartProductIndex].quantity + 1
    updatedCartItems[cartProductIndex].quantity = newQuantity
  }
  else {
    updatedCartItems.push({
      productId: product._id,
      quantity: newQuantity
    })
  }

  const updatedCart = {
    items: updatedCartItems
  }
  this.cart = updatedCart;

  this.save()

}

userSchema.methods.deleteIteminCart = function (productId) {
  const updatedCart = this.cart.items.filter(item => {
    return item._id.toString() !== productId.toString();
  })
  console.log("upadated cart is "+updatedCart)
  this.cart.items = updatedCart;
  return this.save()
}

module.exports = mongoose.model('User', userSchema)
// const getDb = require('../util/database').getDb;
// const mongodb = require('mongodb')

// class User {
//   constructor(name, email, cart, id) {
//     this.name = name,
//       this.email = email,
//       this.cart = cart,
//       this._id = id
//   }
//   save() {
//     const db = getDb();
//     return db.collection('users').updateOne(this)
//   }

//   addToCart(product) {
//     const cartProductIndex = this.cart.items.findIndex(cp => {
//       return cp.productId.toString() === product._id.toString()
//     })
//     let newQuantity = 1;
//     const updatedCartItems = [...this.cart.items]

//     if (cartProductIndex >= 0) {
//       newQuantity = this.cart.items[cartProductIndex].quantity + 1
//       updatedCartItems[cartProductIndex].quantity = newQuantity
//     }
//     else {
//       updatedCartItems.push({
//         productId: mongodb.ObjectId(product._id),
//         quantity: newQuantity
//       })
//     }

//     const updatedCart = {
//       items: updatedCartItems
//     }


//     const db = getDb()
//     return db.collection('users').updateOne(
//       { _id: mongodb.ObjectId(this._id) },
//       { $set: { cart: updatedCart } })
//   }

//   getCart() {
//     const db = getDb();
//     const productIds = this.cart.items.map((p => {
//       return p.productId
//     }))
//     return db.collection('product')
//       .find({ _id: { $in: productIds } })
//       .toArray()
//       .then(products => {
//         return products.map(p => {
//           return {
//             ...p, quantity: this.cart.items.find(i => {
//               return i.productId.toString() === p._id.toString()
//             }).quantity
//           }
//         })
//       })
//   }

//   deleteIteminCart(productId) {
//     const updatedCart = this.cart.items.filter(item => {
//       return item.productId.toString() !== productId.toString();
//     })
//     const db = getDb()
//     return db.collection('users').updateOne(
//       { _id: mongodb.ObjectId(this._id) },
//       { $set: { cart: { items: updatedCart } } })
//   }

//   addOrder() {
//     const db = getDb();
//     return this.getCart()
//       .then(products => {
//         const orders = {
//           items: products,
//           user: {
//             _id: new mongodb.ObjectId(this._id),
//             name: this.name
//           }
//         }
//         return db.collection('orders').insertOne(orders)
//       })
//       .then(res => {
//         this.cart = { items: [] }
//         return db.collection('users')
//           .updateOne({ _id: new mongodb.ObjectId(this._id) }
//             , { $set: { cart: { items: [] } } })
//       })
//   }

//   getOrders() {
//     const db = getDb();
//     return db.collection('orders').find({ 'user._id': new mongodb.ObjectId(this._id) }).toArray()
//   }

//   static findById(userId) {
//     const db = getDb();
//     return db.collection('users').findOne({ _id: new mongodb.ObjectId(userId) })
//   }
// }
// module.exports = User
