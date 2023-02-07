const express = require('express');
const router = express.Router();

const {profile} = require('../controllers/usersController');
const checkToken = require('../middlewares/checkToken');

/* /api/users */
router.get('/', checkToken, profile);

module.exports = router;
