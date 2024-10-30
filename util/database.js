const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost', // Your local IP address
    user: 'root',
    database: 'node-complete',
    password: 'vonisaac2004',
    port: 3307, // Change to 3307 if that's where your MySQL is listenin
})

module.exports = pool.promise()