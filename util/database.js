const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const dbCred = require('./dbCredentials');

let _db;

const mongoConnect = callback => {
  MongoClient.connect(dbCred.mongoUrlUserPass)
    .then(client => {
      console.log('connected!');
      _db = client.db('shop');
      callback(client);
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};


const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
