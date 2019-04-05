const Sequelize = require('sequelize');
const dbCred = require('./dbCredentials');

const sequelize = new Sequelize(dbCred.database, dbCred.user, dbCred.password, {
  host: dbCred.host,
  dialect: 'mysql'
});

module.exports = sequelize;
