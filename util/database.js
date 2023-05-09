const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;
const mongoConnect = callback => {
  MongoClient.connect(
    'mongodb+srv://dattatreya361:KDPaZkQaBvLzLQMD@cluster0.hghla05.mongodb.net/shop?retryWrites=true&w=majority'
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