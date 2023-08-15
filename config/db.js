const mysql = require('mysql')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'real_time_chat',
    password: 'Thapakon230419'
})

module.exports = db