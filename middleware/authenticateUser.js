function authenticateUser (req, res, next) {
  if (res.locals.user.id) {
    next() // call next() without an argument will invoke the next middleware in line
  } else {
    res.redirect('/login')
  }
}

module.exports = authenticateUser
