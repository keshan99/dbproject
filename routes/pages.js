const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');



router.get('/', authController.isLoggedIn, (req, res) => {
    res.render('first', {
        user: req.user
    });
});


router.get('/register', (req, res) => {
    res.render('register');

});

router.get('/login', (req, res) => {
    res.render('login');

});

module.exports = router;