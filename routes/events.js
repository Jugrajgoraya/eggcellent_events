const express = require('express')
const { events } = require('../controllers')

const router = express.Router()

router.get('/', events.index)

router.get('/new', events.new)

// events show page
router.get('/:id', events.show)

// events edit page
// GET "/events/:id/edit"
router.get('/:id/edit', events.edit)

// events patch action
// PATCH "/events/:id"
router.patch('/:id', events.update)

// events create action
router.post('/', events.create)

// events delete action
router.delete('/:id', events.delete)
module.exports = router
