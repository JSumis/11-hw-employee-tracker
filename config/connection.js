const utils = require ("util");
const mysql = require ("mysql");
const connection = mysql.createConnection ({
  host: "localhost", 
  user: "root",
  password: "Password1",
  database: "employeeTrackerDB"
})
connection.connect()
connection.query = utils.promisify(connection.query)
module.exports = connection;