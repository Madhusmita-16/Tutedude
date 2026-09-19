const express = require('express');
const router = express.Router();
const visitorController = require('../controllers/visitorController');

router.get('/', visitorController.getVisitors);
router.post('/register', visitorController.registerVisitor);

module.exports = router;
