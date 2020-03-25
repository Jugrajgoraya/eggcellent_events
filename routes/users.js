const express = require('express')
const { users } = require('../controllers')

const router = express.Router()

router.get('/', users.index)
router.get('/new', users.new)
router.get('/:id', users.show)
router.get('/:id/edit', users.edit)
router.post('/', users.create)
router.delete('/:id', users.destroy)
router.patch('/:id', users.update)

module.exports = router
