const { User } = require('../models')

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
  create: (req, res) => {
    const { firstName, lastName, email, password } = req.body
    new User({ first_name: firstName, last_name: lastName, email, password_digest: password }).save()
      .then(user => {
        res.send(user)
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