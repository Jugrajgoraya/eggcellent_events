const { User } = require('../models')
const Password = require('../helpers/Password')

module.exports = {
  new: (req, res) => {
    console.log('--------------')
    console.log(req.session.id)
    console.log('--------------')
    res.render('sessions/new')
  },
  create: (req, res) => {
    const { email, password } = req.body
    let user
    new User({ email }).fetch()
      .then(u => { // u is a instance of bookshelfORM
        user = u.toJSON() // we need to call .toJSON() to get back the user record's attributes
        return Password.compare(password, user.password_digest)
      })
      .then(result => {
        if (result) {
          req.session.id = user.id
          res.redirect('/')
        } else {
          res.send('Wrong credentials')
        }
      })
      .catch(err => {
        console.log(err)
        console.log('Bookshelf throws CustomError: EmptyResponse when .fetch() does not retrieve a record')
        res.send('Wrong credentials')
      })
  }
}
