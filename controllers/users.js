
const { user } = require('../models')

module.exports = {
  index: (req, res) => {
    user.all()
      .then(users => {
        res.render('users/index', { users })
      })
      .catch(err => {
        console.log(err)
      })
  },
  show: (req, res) => {
    let { id } = req.params
    id = parseInt(id)
    user.one(id)
      .then(user => {
        res.render('users/show', { user })
      })
      .catch(err => {
        console.log(err)
      })
  },
  create: (req, res) => {
    const { first_name, last_name, email, password_digest } = req.body
    user.create({ first_name, last_name, email, password_digest })
      .then(user => {
        res.redirect(`/users/${user.id}`)
      })
      .catch(err => {
        console.log(err)
      })
  },
  new: (req, res) => {
    res.render('users/new')
  },
  delete: (req, res) => {
    const { id } = req.params
    user.delete(id)
      .then(hasDeleted => {
        res.redirect('/users')
      })
      .catch(err => {
        console.log(err)
      })
  },
  edit: (req, res) => {
    const { id } = req.params
    user.one(id)
      .then(user => {
        res.render('users/edit', { user })
      })
  },
  update: (req, res) => {
    const { id } = req.params
    const { first_name, last_name, email, password_digest } = req.body
    user.update({ id, first_name, last_name, email, password_digest })
      .then(user => {
        console.log(user)
        res.redirect(`/users/${user.id}`)
      })
      .catch(err => {
        console.log(err)
      })
  }
}
