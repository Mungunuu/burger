const express = require('express')
const burger = require('../models/burger')
const connection = require('../config/connection')
const ORM = require('../config/orm')

module.exports = function (app) {
  app.get('/', function (req, res) {
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
    let devoured = (req.body.devoured == 'true')
    burger.update(devoured, req.params.id)
      .then(function (data) {
        if (data.changedRows == 0) {
          // If no rows were changed, then the ID must not exist, so 404
          return res.status(404).end()
        } else {
          res.status(200).end()
        }
      })
      .catch(function (err) {
        console.log(err)
      })
  })
}
