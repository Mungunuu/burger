const connection = require('./connection.js')

function ORM (table) {
  console.log('It is in ORM')
  this.table = table

  this.all = function () {
    const sql = `SELECT * FROM ??`

    return new Promise(function (resolve, reject) {
      console.log('connection test' + connection)
      connection.query(sql, table, function (err, data) {
        if (err) reject(err)
        resolve(data)
      })
    })
  },

  this.create = function (burger_name, devoured) {
    const sql = `INSERT INTO burgers (burger_name, devoured) VALUES (?,?)`

    return new Promise(function (resolve, reject) {
      connection.query(sql, [burger_name, devoured], function (err, data) {
        if (err) reject(err)
        resolve(data)
      })
    })
  }

  this.update = function (devoured, id) {
    const sql = `UPDATE burgers SET devoured = ? WHERE id = ?`

    return new Promise(function (resolve, reject) {
      console.log(devoured)
      connection.query(sql, [devoured, id], function (err, data) {
        if (err) reject(err)
        console.log(data)
        resolve(data)
      })
    })
  }
}

module.exports = ORM
