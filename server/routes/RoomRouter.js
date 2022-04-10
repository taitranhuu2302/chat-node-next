const router = require('express').Router();
const RoomController = require('../controllers/RoomController');
const auth = require('../middleware/Authentication');

router.get('/', RoomController.findAll);
router.post('/', RoomController.create);
router.get('/:roomId', auth, RoomController.findById);

module.exports = router;