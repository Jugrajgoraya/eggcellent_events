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

module.exports = router
