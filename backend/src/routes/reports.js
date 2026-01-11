const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

// Report Management
router.get('/', aiController.getReports);

module.exports = router;
