const express = require('express');
const router = express.Router();
const controller = require('../controllers/depositController');

router.get('/', controller.getAll);
router.post('/', controller.create);
router.post('/release/:id', controller.release);

module.exports = router;
