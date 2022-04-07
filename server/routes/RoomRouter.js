const router = require('express').Router();
const RoomController = require('../controllers/RoomController');
const auth = require('../middleware/Authentication');

router.get('/', RoomController.findAll);
router.post('/', RoomController.create);


module.exports = router;