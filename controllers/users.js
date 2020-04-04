const { User } = require('../models') // User is our Bookshelf Model

module.exports = {
  index: (req, res) => {
    User.fetchAll()
      .then(users => {
        users = users.toJSON()
        console.log(users)
        res.render('users/index', { users })
      })
  },
  new: (req, res) => {
    res.render('users/new')
  },
  create: (req, res, next) => {
    const { firstName, lastName, email, password, passwordConfirmation } = req.body
    // we create a new instance of a User model
    new User({
      first_name: firstName,
      last_name: lastName,
      email,
      password: password,
      passwordConfirmation: passwordConfirmation
    }) // calling .save() will trigger the "saving" event.
    // all bookshelf methods will have documentation about which events it will trigger
    // https://bookshelfjs.org/api.html#Model-instance-save
      .save()
      .then(user => {
        user = user.toJSON()
        res.redirect(`/users/${user.id}`)
      })
      .catch(err => { // err is something we have thrown from our model or something bookshelf has thrown
        let errors
        if (err.length) {
          errors = err.map(e => e.message)
        } else {
          errors = [err.message]
        }
        res.render('users/new', { errors })
      })
  },
  show: (req, res) => {
    const { id } = req.params
    new User({ id }).fetch()
      .then(user => {
        user = user.toJSON()
        res.render('users/show', { user })
      })
  },
  destroy: (req, res) => {
    const { id } = req.params
    new User({ id }).destroy()
      .then(() => {
        res.redirect('/users')
      })
  },
  edit: (req, res) => {
    const { id } = req.params
    new User({ id }).fetch()
      .then(user => {
        user = user.toJSON()
        res.render('users/edit', { user })
      })
  },
  update: (req, res) => {
    const { id } = req.params
    const { firstName, lastName, email, password } = req.body
    new User({ id }).save({ first_name: firstName, last_name: lastName, email, password_digest: password })
      .then(user => {
        res.redirect(`/users/${user.id}`)
      })
  }
}
