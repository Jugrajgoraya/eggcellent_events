const express = require('express')
const logger = require('morgan')
const eventsRouter = require('./routes/events')

const app = express()

app.set('view engine', 'ejs') // sets the "view engine" configuration to use 'ejs'. IE Telling ExpressJS to use EJS as our views
app.set('views', 'views') // tell express our view files are in a directory called views

// Middleware
// Middleware are functions that sit inside of a request/reponse cycle that are used to change the request response objects or execute code between the request and response

// Morgan Middleware - used for logging requests
// the location of where you invoke/mount the middleware matters. If you need certain middleware to run before something then make sure it is invoked before
app.use(logger('dev'))
app.use(express.urlencoded({ extended: true })) // middleware for parsing HTTP POST request's body. It will put all the data from a POST request into a property `req.body`

// Routes

// Event Router
// If someone goes to /events... use eventsRouter
app.use('/events', eventsRouter)

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

// Morning Folks, Wednesday March 11. We'll start lecture at 9:30am

// Todays agenda:
// Refactoring Business Logic into Controllers
// Refactoring Business Logic into Models
// Static Middleware
// Custom Middleware

// Controller
// - responsible for handling a request
// - get resources. Example,  it will ask the Model to query some data from the database
// - make responses. For example, it will render a View.