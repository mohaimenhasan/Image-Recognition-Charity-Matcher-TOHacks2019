var express = require('express');
var router = express.Router();

const locationController = require('../controller/location.controller');

router.get('/test', locationController.test);
<<<<<<< HEAD
router.get('/something')
=======
router.post('/add_user', locationController.add_user);
>>>>>>> 003153531f5c4476704d9df498a150dab0ca1792

module.exports = router;
