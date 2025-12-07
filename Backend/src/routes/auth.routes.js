const express = require('express');
const validators = require('../middlewares/validate.middlwares');
const authController =require('../controller/auth.controller')

const router = express.Router();



// POST /auth/register
router.post('/register', validators.signInValidations, authController.signIN);

// POST /auth/login
router.post('/login', validators.loginValidations, authController.loginUser);







module.exports = router;
