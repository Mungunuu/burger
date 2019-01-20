const connection = require('../config/connection')

function ORM (table) {
  this.table = table

  this.all = function () {
    const sql = `SELECT * FROM burgers`

    return new Promise(function (resolve, reject) {
      connection.query(sql, table, function (err, data) {
        if (err) reject(err)
        resolve(data)
      })
    })
  },

  this.create = function (burger_name, devoured) {
    const sql = `INSERT INTO burgers (burger_name, devoured) VALUES (?,?)`

    return new Promise(function (resolve, reject) {
      connection.query(sql, [table, burger_name, devoured], function (err, data) {
        if (err) reject(err)
        resolve(data)
      })
    })
  }

  this.update = function (devoured, id) {
    const sql = `UPDATE burgers SET devoured = ? WHERE id = ?`

    return new Promise(function (resolve, reject) {
      connection.query(sql, [table, devoured, id], function (err, data) {
        if (err) reject(err)
        resolve(data)
      })
    })
  }
}
module.exports = ORM
