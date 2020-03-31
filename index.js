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

// Middleware
// Middleware are functions that sit inside of a request/reponse cycle that are used to change the request response objects or execute code between the request and response

// Morgan Middleware - used for logging requests
// the location of where you invoke/mount the middleware matters. If you need certain middleware to run before something then make sure it is invoked before
app.use(logger('dev'))
app.use(express.static('public')) // install express static middleware https://expressjs.com/en/4x/api.html#express.static
app.use(express.urlencoded({ extended: true })) // middleware for parsing HTTP POST request's body. It will put all the data from a POST request into a property `req.body`
app.use(cookieSession({
  name: 'session', // this is the key of the cookie
  secret: 'supersecret', // used to sign our cookie
  maxAge: 24 * 60 * 60 * 1000 // to expire expire the cookie after 1 day
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

// Event Router
// If someone goes to /events... use eventsRouter
app.use('/events', eventsRouter)
app.use('/users', usersRouter)
app.use('/', rootsRouter)

// GET "/"
app.get('/', (req, res) => {
  // res.send("<h1>Hello World</h1>")
  res.render('hello_world.ejs')
})

// When somebody goes to "GET localhost:3000/survey"
app.get('/survey', (req, res) => {
  console.log(req.query)
  // render a ejs template instead
  // res.send("<h1>Survey</h1>")
  res.render('survey.ejs')
})

app.post('/survey', (req, res) => {
  console.log(req.body) // once we have the express.urlencoded middleware setup we can grab data from req.body
  res.send('thank you')
})

app.get('/memes', (req, res) => {
  res.render('memes.ejs', {
    title: 'Welcome to the meme page',
    memes: [
      'https://www.probytes.net/wp-content/uploads/2018/01/2.jpg',
      'https://www.probytes.net/wp-content/uploads/2018/01/20.png',
      'https://www.probytes.net/wp-content/uploads/2018/01/r_389776_tqMPa-1.jpg'
    ]
  })
})

const PORT = 3000
const DOMAIN = 'localhost'

app.listen(PORT, DOMAIN, () => {
  console.log(`Server Listening on ${DOMAIN}:${PORT}`)
})
