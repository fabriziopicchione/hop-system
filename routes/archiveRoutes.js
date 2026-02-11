const express = require('express');
const router = express.Router();
const controller = require('../controllers/archiveController');

router.get('/', controller.getDedicated);
router.post('/', controller.createDedicated);

module.exports = router;
