const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
require('dotenv').config();

let _db;
const mongoConnect = callback => {
  MongoClient.connect(
    process.env.MONGODBURL
  )
    .then(client => {
      console.log('Connected!');
      _db = client.db()
      callback(client);
    })
    .catch(err => {
      console.log(err);
    });
};

const getDb = () => {
  if (_db) {
    return _db
  }
  throw 'no databse found'
}

exports.mongoConnect = mongoConnect;

exports.getDb = getDb