const express = require('express');
const router = express.Router();
const controller = require('../controllers/luggageController');

router.get('/', controller.getAll);
router.post('/', controller.create);
router.patch('/:id', controller.updateStatus);
router.delete('/:id', controller.delete);

module.exports = router;
