const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { promisify } = require('util');
const fs = require('fs');

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
        //console.log("My sql connected.sss..");
    }
})

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}


exports.isLoggedIn = async(req, res, next) => {
    if (req.cookies.jwt) {
        try {
            // TODO: verify the token
            const decoed = await promisify(jwt.verify)(req.cookies.jwt,
                process.env.JWT_SECRET)

            console.log(decoed);

            // TODO: cheak if still exists
            db.query('SELECT * FROM user WHERE ID = ?', [decoed.id], (error, result) => {
                console.log(result);

                if (!result) {
                    return next();
                }

                // create user variable
                req.user = result[0];

                //create name
                if (result[0].M_name == "") {
                    req.user.name = result[0].F_name + " " + result[0].L_name;
                } else {
                    req.user.name = result[0].F_name + " " + result[0].M_name + " " + result[0].L_name;
                }

                //create name with initials
                if (result[0].M_name == "") {
                    req.user.nameWI = result[0].F_name[0] + ". " + result[0].L_name;
                } else {
                    req.user.nameWI = result[0].F_name[0] + "." + result[0].M_name[0] + ". " + result[0].L_name;
                }

                //create DOB

                req.user.dateOfBirth = formatDate(result[0].DOB);


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

        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);



        db.query('INSERT INTO user SET ?', { F_name: Fname, M_name: Mname, L_name: Lname, Email: email, password: hashedPassword, DOB: DOB, gender: gender, batch: batch, department: department, city: city }, (errror, result) => {
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
            } else if (!(await bcrypt.compare(password, results[0].password))) {
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


// update profile pic
exports.data = async(req, res) => {


    var data = req.body.pic;
    var imageBuffer = new Buffer(data, 'base64'); //console = <Buffer 75 ab 5a 8a ...
    //fs.writeFile("test.png", imageBuffer, function(err) {});

    var base64Data = req.body.pic.replace(/^data:image\/png;base64,/, "");




    if (req.cookies.jwt) {
        try {
            // TODO: verify the token
            const decoed = await promisify(jwt.verify)(req.cookies.jwt,
                process.env.JWT_SECRET)



            // TODO: cheak if still exists
            db.query('SELECT * FROM user WHERE ID = ?', [decoed.id], (error, result) => {
                console.log(result);

                if (!result) {
                    res.status(200).redirect("/fdf");
                }

                // create user variable
                //req.user = result[0];

                let path = "public/images/" + result[0].ID + ".png";
                require("fs").writeFile(path, base64Data, 'base64', function(err) {
                    console.log("profile pic update");
                });


                res.status(200).redirect("/profile");


            })

        } catch {
            res.status(200).redirect("/fdf");
        }
    }

}



// update profile data
exports.updateProfile = async(req, res) => {
    try {
        // TODO: verify the token
        const decoed = await promisify(jwt.verify)(req.cookies.jwt,
            process.env.JWT_SECRET)

        //console.log(decoed);
        console.log("update")


        // TODO: cheak if still exists
        db.query('SELECT * FROM user WHERE ID = ?', [decoed.id], (error, result) => {
            //console.log(result);


            if (!result) {
                res.status(200).redirect("/fdfdf");
            }

            // create user variable
            let userid = result[0].ID;


            const { Fname, Mname, Lname, email, DOB, gender, batch, department, city } = req.body;
            console.log([Fname, Mname, Lname, email, DOB, gender, batch, department, city, userid]);

            db.query('UPDATE user SET F_name = ?, M_name = ?, L_name = ?, Email = ?, DOB = ?, gender = ?, batch = ?, department = ?, city = ? WHERE ID=?', [Fname, Mname, Lname, email, DOB, gender, batch, department, city, userid], (errror, result) => {

                if (error) {
                    console.log(error);
                }
                res.status(200).redirect("/profile");
            });
        });
    } catch (error) {
        console.log(error);
    }

}