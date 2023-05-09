const getDb = require('../util//database').getDb
class Product {
  constructor(title, price, description, imageUrl) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl
  }
  save() {
    const db = getDb()
    return db.collection('product').insertOne(this)
      .then((result) => {
        console.log(result)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  static fetchAll(){
    const db = getDb()
    return db.collection('product').find().toArray()
    .then((products)=>{
      return products
    })
    .catch((err)=>{
      console.log(err)
    }); // find will not return promise immediatly but cursor ,it means it will go to the documents dat step by step
  }
}



module.exports = Product;
