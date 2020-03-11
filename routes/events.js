const express = require('express')
const { events } = require('../controllers')

const router = express.Router()

router.get('/', events.index)

router.post('/', events.create)

// refactor this router to use the controller
router.get('/new', events.new)

module.exports = router