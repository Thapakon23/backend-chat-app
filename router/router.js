const express = require('express');
const user_router = require('./users/router');
const message_router = require('./messages/router');
const friends_router = require('./friends/router');
const router = express.Router();

router.use('/', user_router);
router.use('/', message_router)
router.use('/', friends_router)

module.exports = router;
 