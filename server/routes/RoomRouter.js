const router = require('express').Router();
const RoomController = require('../controllers/RoomController');
const auth = require('../middleware/Authentication');

router.get('/', auth, RoomController.findAll);
router.post('/', RoomController.create);
router.get('/:id', RoomController.findById);
router.put('/', RoomController.update);
router.delete('/', RoomController.delete);

module.exports = router;