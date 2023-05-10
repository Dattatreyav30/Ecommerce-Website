
const getDb = require('../util/database').getDb;
const mongodb = require('mongodb')

class User {
  constructor(name, email) {
    this.name = name;
    this.email = email
  }
  static save() {
    const db = getDb();
    return db.collection('users').updateOIne(this)
  }
  static findByUserId(userId) {
    const db = getDb();
    return db.collection('users').find({ _id: new mongodb.ObjectId(userId) })
    .next()
  }
}
module.exports = User
