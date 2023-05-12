const getDb = require('../util//database').getDb
const mongodb = require('mongodb')
class Product {
  constructor(title, price, description, imageUrl, id, userId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl
    this._id = id
    this.userId = userId
  }
  save() {
    const db = getDb()
    let dbOp;
    if (this._id) {
      dbOp = db.collection('product').updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this })
    }
    else {
      dbOp = db.collection('product').insertOne(this)
    }
    return dbOp
      .then((result) => {
        console.log(result)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  static fetchAll() {
    const db = getDb()
    return db.collection('product').find().toArray()
      .then((products) => {
        return products
      })
      .catch((err) => {
        console.log(err)
      }); // find will not return promise immediatly but cursor ,it means it will go to the documents dat step by step
  }
  static findById(prodId, boolean) {
    console.log(prodId)
    const db = getDb()
    let dbOp;
    if (boolean) {
      //delete the product
      dbOp = db.collection('product').deleteOne({ _id: new mongodb.ObjectId(prodId) })
    }
    else {
      dbOp = db.collection('product').find({ _id: new mongodb.ObjectId(prodId) }).next()
    }
    return dbOp
      .then((product) => {
        return product
      })
      .catch((err) => {
        console.log(err)
      })
  }
}



module.exports = Product;
