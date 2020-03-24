const { event } = require('../models/events') // deconstructing event property from models object
// const models = require('../models') these two lines are replaced by the one above
// const event = models.event

module.exports = {
  index: (req, res) => {
    event.fetchAll()
      .then(events => {
        // Bookshelf ORM returns a Bookshelf Model instance that has a bunch of extra methods.
        // we have to call events.toJSON() to grab the records from the Bookshelf Model Instance
        events = events.toJSON()
        res.render('events/index', { events }) // when we get all the events respond with a view
      })
  },
  show: (req, res) => {
    let { id } = req.params // req.params.id is the value coming from the URL
    id = parseInt(id)
    event.one(id)
      .then(event => { // knex always returns an array of records
        res.render('events/show', { event })
      })
  },
  create: (req, res) => {
    const { title, description } = req.body
    event.create({ title, description })
      .then(event => {
        res.redirect(`/events/${event.id}`)
      })
  },
  new: (req, res) => {
    res.render('events/new')
  },
  delete: (req, res) => {
    const { id } = req.params // req.params.id is the value coming from the URL
    event.delete(id)
      .then(hasDeleted => {
        if (hasDeleted) {
          res.redirect('/events')
        } else {
          res.redirect(`/events/${id}`)
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  edit: (req, res) => {
    const { id } = req.params
    event.one(id)
      .then(event => {
        res.render('events/edit', { event })
      })
  },
  update: (req, res) => {
    const { id } = req.params
    const { title, description } = req.body
    event.update({ id, title, description })
      .then(event => {
        if (event) {
          res.redirect(`/events/${event.id}`)
        } else {
          res.redirect(`/events/${id}/edit`)
        }
      })
  }
}