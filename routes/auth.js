const express = require('express');
const authController = require('../controllers/auth');
const detail = require('../controllers/details');

const router = express.Router();



router.post('/register', authController.register)
router.post('/login', authController.login)
router.get('/logout', authController.logout)
router.post('/data', authController.data)
router.post('/updateProfile', authController.updateProfile)
router.post('/updateMoney', detail.updateMoney)







module.exports = router;