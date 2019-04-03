const mysql = require('mysql2');

const dbCred = require('./dbCredentials');

const pool = mysql.createPool(dbCred);

module.exports = pool.promise();
