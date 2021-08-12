const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();



router.post('/register', authController.register)
router.post('/login', authController.login)
router.get('/logout', authController.logout)
router.post('/data', authController.data)
router.post('/updateProfile', authController.updateProfile)







module.exports = router;