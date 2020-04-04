const express = require('express')
const { SessionsController } = require('../controllers')

const router = express.Router()

// Login Page
// GET "/login"
router.get('/login', SessionsController.new)
// Create Session
// POST "/login"
router.post('/login', SessionsController.create)

router.delete('/session', SessionsController.delete)

router.get('/', (req, res) => {
  res.render('hello_world.ejs')
})

router.get('/survey', (req, res) => {
  console.log(req.query)
  res.render('survey.ejs')
})

router.post('/survey', (req, res) => {
  console.log(req.body) // once we have the express.urlencoded middleware setup we can grab data from req.body
  res.send('thank you')
})

router.get('/memes', (req, res) => {
  res.render('memes.ejs', {
    title: 'Welcome to the meme page',
    memes: [
      'https://www.probytes.net/wp-content/uploads/2018/01/2.jpg',
      'https://www.probytes.net/wp-content/uploads/2018/01/20.png',
      'https://www.probytes.net/wp-content/uploads/2018/01/r_389776_tqMPa-1.jpg'
    ]
  })
})

module.exports = router
