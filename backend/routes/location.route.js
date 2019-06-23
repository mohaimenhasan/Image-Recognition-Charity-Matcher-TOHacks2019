var express = require('express');
var router = express.Router();

const locationController = require('../controller/location.controller');

router.get('/test', locationController.test);
router.post('/add_user', locationController.add_user);

module.exports = router;
