const Router = require('express')
const router = new Router()
const playlistTrackController = require('../controllers/playlistTrackController')

router.post('/', playlistTrackController.create)
router.get('/', playlistTrackController.getAll)
router.delete('/:id', playlistTrackController.delete)

module.exports = router