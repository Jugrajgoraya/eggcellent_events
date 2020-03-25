module.exports = {
  new: (req, res) => {
    res.render('sessions/new')
  },
  create: (req, res) => {
    // sessionCookie middleware creates a session cookie for us
    // we can add anything to req.session and it will be saved the cookie
    req.session.hello = 'world'
    res.cookie('hello', 'world')
    res.send('Sessions Create')
  }
}
