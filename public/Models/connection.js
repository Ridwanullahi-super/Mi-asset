const mysql = require('mysql2')
 
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'mi_assets'
})

connection.connect();
console.log("database is connected!");

module.exports = connection.promise();