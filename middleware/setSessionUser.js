function setSessionUser (req, res, next) {
  // res.locals is a object that contains global variables.
  // these varaibles will be acccessable within any other middleware as well as our EJS templates
  res.locals.user = {}
  if (req.session.user) {
    // setting a global "user" variable to be the session cookie's user value
    res.locals.user = req.session.user
  }
  next()
}

module.exports = setSessionUser
