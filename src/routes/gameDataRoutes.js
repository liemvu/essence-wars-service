const express = require('express');
const gameDataController = require('../controllers/gameDataController');

const router = express.Router();

router.get('/:key', gameDataController.getGameDataByKey);

module.exports = router;