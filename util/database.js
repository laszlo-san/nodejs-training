const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const dbCred = require('./dbCredentials');

const mongoConnect = (callback) => {
  MongoClient.connect(dbCred.mongoUrlUserPass)
    .then(client => {
      console.log('connected!');
      callback(client);
    })
    .catch(err => console.log(err));
};


module.exports = mongoConnect;