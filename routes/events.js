const express = require('express')
const { events } = require('../controllers')
const authenticateUser = require('../middleware/authenticateUser')

const router = express.Router()

// router.use(authenticateUser) will mount this middleware before all of the routes below

// events index page
router.get('/', events.index)

//  GET "/events/new"
router.get('/new', authenticateUser, events.new)

// events show page
// "/events/:id"
// "/events/2"
router.get('/:id', events.show)

// events edit page
// GET "/events/:id/edit"
router.get('/:id/edit', authenticateUser, events.edit)

// events patch action
// PATCH "/events/:id"
router.patch('/:id', authenticateUser, events.update)

// events create action
router.post('/', authenticateUser, events.create)

// events delete action
router.delete('/:id', authenticateUser, events.delete)

module.exports = router
