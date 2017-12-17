const express = require('express');
const router  = express.Router();

router.use('/', express.static('client'));

module.exports = router;
