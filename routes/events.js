const express = require('express')
const knex = require('../db/client')
const router = express.Router()

router.get('/', (req, res) => {
  knex.select('*').from('events')
    .then(events => {
      res.render('events/index', { events })
    })
})

router.post('/', (req, res) => {
  const { title, description } = req.body
  knex.insert({ title, description }).into('events')
    .then(() => {
      res.redirect('/events')
    })
    .catch(() => {
      res.render('events/new')
    })
})

router.get('/new', (req, res) => {
  res.render('events/new')
})

module.exports = router
