var express = require('express');
var router = express.Router();

const locationController = require('../controller/location.controller');

router.get('/test', locationController.test);
router.get('/something')

module.exports = router;
