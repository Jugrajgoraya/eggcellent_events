const { event } = require('../models') // deconstructing event property from models object
// const models = require('../models') these two lines are replaced by the one above
// const event = models.event

module.exports = {
  index: (req, res) => {
    event.all() // ask the model for all of our vents
      .then(events => {
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
        res.send(event)
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
      .then(events => {
        if (events.length > 0) {
          res.redirect(`/events/${events[0].id}`)
        } else {
          res.send(`Update to event with id ${id} failed`)
        }
      })
  }
}