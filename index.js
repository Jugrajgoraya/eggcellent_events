const express = require('express')
const logger = require('morgan')
const methodOverride = require('method-override')
const cookieSession = require('cookie-session')
const eventsRouter = require('./routes/events')
const usersRouter = require('./routes/users')
const rootsRouter = require('./routes/roots')
const noMonkey = require('./middleware/noMonkey')
const setSessionUser = require('./middleware/setSessionUser')

const app = express()

app.set('view engine', 'ejs') // sets the "view engine" configuration to use 'ejs'. IE Telling ExpressJS to use EJS as our views
app.set('views', 'views') // tell express our view files are in a directory called views

// Morgan Middleware - used for logging requests
// the location of where you invoke/mount the middleware matters. If you need certain middleware to run before something then make sure it is invoked before
app.use(logger('dev'))
app.use(express.static('public')) // install express static middleware https://expressjs.com/en/4x/api.html#express.static
app.use(express.urlencoded({ extended: true })) // middleware for parsing HTTP POST request's body. It will put all the data from a POST request into a property `req.body`
app.use(cookieSession({
  name: 'session', // this is the key of the cookie
  secret: 'supersecret', // used to sign our cookie
  maxAge: 24 * 60 * 60 * 1000 // to expire -->> expire the cookie after 1 day
}))
// cookieSession middleware allows us to create a session by adding something to req.session

// This methodOverride middleware is a HACK to make HTML forms support DELETE/PUT/PATCH/ect methods
app.use(methodOverride((req, res) => {
  if (req.body && req.body._method) {
    const method = req.body._method
    // this function should return a string of "DELETE"/"PUT"/"PATCH"/ect
    // it will replace the POST method being made.
    return method
  }
}))

app.use(setSessionUser)
app.use(noMonkey)
// Routes

app.use('/events', eventsRouter)
app.use('/users', usersRouter)
app.use('/', rootsRouter)

const PORT = 3000
const DOMAIN = 'localhost'

app.listen(PORT, DOMAIN, () => {
  console.log(`Server Listening on ${DOMAIN}:${PORT}`)
})
