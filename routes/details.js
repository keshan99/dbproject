const express = require('express');
const detail = require('../controllers/details');
const router = express.Router();


router.post('/updatemoney', detail.updatemoney);







module.exports = router;