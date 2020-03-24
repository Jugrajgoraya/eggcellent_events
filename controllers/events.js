const { event } = require('../models') // deconstructing event property from models object
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
      .catch(err => {
        console.log(err)
      })
  },
  show: (req, res) => {
    let { id } = req.params // req.params.id is the value coming from the URL
    id = parseInt(id)
    new event({ id }).fetch() //https://bookshelfjs.org/api.html#Model-instance-fetch
      .then(event => { // knex always returns an array of records
        event = event.toJSON()
        res.render('events/show', { event })
      })
      .catch(err => { // will throw this https://bookshelfjs.org/api.html#Model-static-NotFoundError error if we don't recieve a event back from fetch()
        console.log(err)
      })
  },
  create: (req, res) => {
    const { title, description } = req.body
    const newEvent = event.forge({ title, description }) // event.forge creates a new in memory instance of Event
    newEvent.save() // calling .save() will add the instance to the database
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