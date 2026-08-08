const express = require('express');
const bcrypt = require("bcrypt");
const {handleUserSignup,handleUserLogin} = require('../controllers/user');

const router = express.Router();

router.post('/',handleUserSignup);
router.post('/login',handleUserLogin);


module.exports = router;