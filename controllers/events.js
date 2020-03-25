const { Event } = require('../models') // deconstructing event property from models object
// const models = require('../models') these two lines are replaced by the one above
// const event = models.event

module.exports = {
  index: (req, res) => {
    Event.fetchAll()
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
    new Event({ id }).fetch() //https://bookshelfjs.org/api.html#Model-instance-fetch
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
    const newEvent = Event.forge({ title, description }) // event.forge creates a new in memory instance of Event
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
    new Event({ id }).destroy() // delete the event record with id
      .then(hasDeleted => {
        res.redirect('/events')
      })
      .catch(err => { //throws https://bookshelfjs.org/api.html#Model-static-NoRowsDeletedError error if no records are deleted
        console.log(err)
      })
  },
  edit: (req, res) => {
    const { id } = req.params
    new Event({ id }).fetch()
      .then(event => {
        event = event.toJSON()
        res.render('events/edit', { event })
      })
  },
  update: (req, res) => {
    const { id } = req.params
    const { title, description } = req.body
    new Event({ id }).save({ title, description })
      .then(event => {
        event = event.toJSON()
        res.redirect(`/events/${event.id}`)
      })
      .catch(err => { // throws https://bookshelfjs.org/api.html#Model-static-NoRowsUpdatedError if no records were updated
        console.log(err)
      })
  }
}
