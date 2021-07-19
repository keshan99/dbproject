const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { promisify } = require('util');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    port: '3306',

});

db.connect((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("My sql connected.sss..");
    }
})



exports.isLoggedIn = async(req, res, next) => {
    if (req.cookies.jwt) {
        try {
            // TODO: verify the token
            const decoed = await promisify(jwt.verify)(req.cookies.jwt,
                process.env.JWT_SECRET)

            console.log("hello")
            console.log(decoed);

            // TODO: cheak if still exists
            db.query('SELECT * FROM user WHERE ID = ?', [decoed.id], (error, result) => {
                console.log(result);

                if (!result) {
                    return next();
                }

                // create user variable
                req.user = result[0]
                return next();
            })

        } catch (error) {
            console.log(error);
            return next();
        }
    } else {
        return next();
    }

}




exports.register = (req, res) => {


    //console.log("ok");
    //res.status(200).redirect("/");




    // get values from form
    const { Fname, Mname, Lname, email, password, DOB, gender, batch, department, city } = req.body;
    console.log([Fname, Mname, Lname, email, password, DOB, gender, batch, department, city]);

    db.query('SELECT email FROM user WHERE email = ?', [email], async(error, result) => {

        if (error) {
            console.log(error);
        }

        if (result.length > 0) {
            return res.render('register', {
                message: 'That email is already in use'
            });
        }

        //let hashedPassword = await bcrypt.hash(password, 8);
        //console.log(hashedPassword);



        db.query('INSERT INTO user SET ?', { F_name: Fname, M_name: Mname, L_name: Lname, Email: email, password: password, DOB: DOB, gender: gender, batch: batch, department: department, city: city }, (errror, result) => {
            if (error) {
                console.log(error);
            } else {
                console.log(result);
                return res.status(200).redirect("/");

                // return res.render('register', {
                //    message: 'User registered'
                // });
            }
        })




    });
}



exports.login = async(req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).render('login', {
                message: 'Please provide an email and passsword'
            })
        }

        db.query('SELECT * FROM user WHERE email = ?', [email], async(error, results) => {
            console.log(results);
            if (results.length == 0) {
                res.status(401).render('login', {
                    message: 'Email is incorrect'
                })
            } else if (!(password == results[0].password)) {
                res.status(401).render('login', {
                    message: 'password is incorrect'
                })
            } else {
                const id = results[0].ID;

                const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                });

                console.log('the token is: ' + token);

                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                    ),
                    httpOnly: true
                }

                res.cookie('jwt', token, cookieOptions);
                res.status(200).redirect("/");



            }




        })


    } catch (error) {
        console.log(error);
    }
}



exports.logout = async(req, res) => {
    res.cookie('jwt', 'logout', {
        expires: new Date(Date.now() + 2 * 1000),
        httpOnly: true
    })

    res.status(200).redirect('/')
}