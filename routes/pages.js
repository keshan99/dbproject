const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const detail = require('../controllers/details');

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

router.get('/profile', authController.isLoggedIn, (req, res) => {
    if (req.user) {
        res.render('profile', {
            user: req.user
        });
    } else {
        res.redirect('/login');
    }
});

router.get('/updatepic', authController.isLoggedIn, (req, res) => {
    if (req.user) {
        res.render('updatepic', {
            user: req.user
        });
    } else {
        res.redirect('/login');
    }

});


router.get('/money', detail.money, (req, res) => {
    if (req.user) {
        res.render('money', {
            totalIn: req.totalIn,
            totalOut: req.totalOut,
            moneydetailIn: req.moneydetailIn,
            moneydetailOut: req.moneydetailOut,
            moneyEnterIn: req.moneyEnterIn,
            moneyEnterOut: req.moneyEnterOut,
            user: req.user
        });
    } else {
        res.redirect('/login');
    }

});



router.get('/changeTitleIn', detail.money, (req, res) => {
    res.render('money_item_update_IN', {
        moneyEnterIn: req.moneyEnterIn,
        user: req.user
    });

});
router.get('/changeTitleOut', detail.money, (req, res) => {
    res.render('money_item_update_OUT', {
        moneyEnterOut: req.moneyEnterOut,
        user: req.user
    });

});

router.post('/updateMoneyTitleIn', detail.updateMoneyTitleIn);
router.post('/updateMoneyTitleOut', detail.updateMoneyTitleOut);

router.get('/note', detail.note, (req, res) => {
    res.render('note', {
        notes: req.notes,
        //moneyEnterOut: req.moneyEnterOut,
        user: req.user
    });

});

router.post('/addNote', detail.addnote);
router.post('/updateNote', detail.updateNote);
router.post('/deleteNote', detail.deleteNote);

let item1 = {
    id: 1,
    title: "t1",
    list: [{ id: 100, name: "one", done: 0 },
        { id: 101, name: "two", done: 1 },
        { id: 102, name: "two", done: 0 }
    ]
};

let item2 = {
    id: 2,
    title: "t2",
    list: [{ id: 103, name: "one2", done: 0 }, { id: 104, name: "two2", done: 1 },
        { id: 105, name: "two2", done: 1 }
    ]
};
let item3 = {
    id: 3,
    title: "t2",
    list: [{ id: 106, name: "one2", done: 0 }, { id: 107, name: "two2", done: 1 },
        { id: 108, name: "two2", done: 1 }
    ]
};

let items = [item1, item2, item3, ]

router.get('/task', (req, res) => {

    res.render('task_list', {
        items: items
    });

});

router.post('/addTask', detail.addTask);


module.exports = router;