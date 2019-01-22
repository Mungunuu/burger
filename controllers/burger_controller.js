const express = require('express')
const burger = require('../models/burger')
const connection = require('../config/connection')
const ORM = require('../config/orm')

/** 
 * HTTP Status Codes:
 * 200 - Ok
 * 404 - Not Found
 * 500 - Internal Server Error
 * 400 - Bad Request
 *  */

module.exports = function (app) {
  app.get('/index', function (req, res) {
    burger.all()
      .then(function (data) {
        res.render('index', {burgers: data})
      })
      .catch(function (err) {
        console.log(err)
      })
  })

  app.post('/api/burgers', function (req, res) {
    burger.create(req.body.burger_name, false)
      .then(function (data) {
        res.json({ id: data.insertId })
      })
      .catch(function (err) {
        console.log(err)
      })
  })

  app.put('/api/burgers/:id', function (req, res) {
    console.log(req.params.id)
    burger.update(true, req.params.id)
      .then(function (data) {
        if (data.changedRows == 0) {
          // If no rows were changed, then the ID must not exist, so 404
          // 404 - Http Status NOT_FOUND
          return res.status(404).end()
        } else {
          // 200 - Http Status OK
          res.status(200).end()
        }
      })
      .catch(function (err) {
        console.log(err)
      })
  })
}
