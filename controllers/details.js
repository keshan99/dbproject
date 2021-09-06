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
        //console.log("My sql connected");
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

function getTime(datetime) {
    var date = new Date(datetime);
    return ((date.getHours() < 10) ? "0" : "") + date.getHours() + ":" + ((date.getMinutes() < 10) ? "0" : "") + date.getMinutes() + ":" + ((date.getSeconds() < 10) ? "0" : "") + date.getSeconds();
}


exports.money = async(req, res, next) => {
    if (req.cookies.jwt) {
        try {
            // TODO: verify the token
            const decoed = await promisify(jwt.verify)(req.cookies.jwt,
                process.env.JWT_SECRET)

            //console.log(decoed);

            // TODO: cheak if still exists
            db.query('SELECT * FROM user WHERE ID = ?', [decoed.id], (error, result) => {
                // console.log(result);

                if (!result) {
                    return next();
                }

                // create user variable
                req.user = result[0];

                db.query('SELECT Topic_ID, name,in_or_out, priority  FROM topic_of_money WHERE User_id = ? ', [decoed.id], (error, result) => {
                    if (result) {
                        //console.log(result);
                        req.moneyEnterIn = [];
                        req.moneyEnterOut = [];
                        let inM = 0;
                        let outM = 0;
                        for (let i = 0; i < result.length; i++) {
                            if (result[i].in_or_out == 1) {
                                req.moneyEnterIn[inM] = result[i];
                                inM++;
                            } else {
                                req.moneyEnterOut[outM] = result[i];
                                outM++;
                            }

                        }

                    }
                })

                db.query('SELECT R.RID, R.value, R.note, R.date_time, R.bil_img,R.TID, TOM.in_or_out, TOM.name FROM record R JOIN topic_of_money TOM ON R.TID = TOM.Topic_ID where R.User_id = ? ORDER BY date_time DESC', [decoed.id], (error, result) => {
                    if (!result) {
                        return next();
                    }
                    //console.log(result);
                    let inM = 0;
                    let outM = 0;
                    req.moneydetailIn = [];
                    req.moneydetailOut = [];
                    for (let i = 0; i < result.length; i++) {
                        if (result[i].in_or_out == 1) {
                            req.moneydetailIn[inM] = result[i];
                            req.moneydetailIn[inM].date = formatDate(result[i].date_time);
                            req.moneydetailIn[inM].time = getTime(result[i].date_time);
                            inM++;
                        } else {
                            req.moneydetailOut[outM] = result[i];
                            req.moneydetailOut[outM].date = formatDate(result[i].date_time);
                            req.moneydetailOut[outM].time = getTime(result[i].date_time);
                            outM++;

                        }
                    }
                    return next();

                })
            })

        } catch (error) {
            console.log(error);
            return next();
        }
    } else {
        return next();
    }

}

exports.updateMoney = async(req, res, next) => {
    if (req.cookies.jwt) {
        try {
            // TODO: verify the token
            const decoed = await promisify(jwt.verify)(req.cookies.jwt,
                process.env.JWT_SECRET)

            // console.log(decoed);

            // TODO: cheak if still exists
            db.query('SELECT * FROM user WHERE ID = ?', [decoed.id], (error, result) => {
                //console.log(result);

                if (!result) {
                    return next();
                }

                // create user variable
                req.user = result[0];

                const { moneyItemID, money, note } = req.body;
                var tempBil_img = "no";
                var currentdate = new Date();
                db.query('INSERT INTO record SET ?', { value: money, note: note, bil_img: tempBil_img, date_time: currentdate, TID: moneyItemID, User_id: decoed.id }, (error, result) => {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log(result);
                        return res.status(200).redirect("/money");

                    }
                })
            });
        } catch (error) {
            console.log(error);
            return next();
        }
    } else {
        return next();
    }

}



exports.deleteMoneyRecode = async(req, res, next) => {
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

                const { RecodeID } = req.body;

                db.query('DELETE FROM record WHERE RID = ?', [RecodeID], (error, result) => {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log(result);
                        return res.status(200).redirect("/money");

                    }
                })
            });
        } catch (error) {
            console.log(error);
            return next();
        }
    } else {
        return next();
    }

}



exports.updateMoneyrecode = async(req, res, next) => {
    if (req.cookies.jwt) {
        try {
            // TODO: verify the token
            const decoed = await promisify(jwt.verify)(req.cookies.jwt,
                process.env.JWT_SECRET)

            // console.log(decoed);
            console.log("awaaaaaaaaaa1")

            // TODO: cheak if still exists
            db.query('SELECT * FROM user WHERE ID = ?', [decoed.id], (error, result) => {
                //    console.log(result);

                if (!result) {
                    return next();
                }

                // create user variable
                req.user = result[0];

                const { moneyItemID, money, note, RecodeID } = req.body;
                // var tempBil_img = "no";
                console.log("awaaaaaaaaaaa")

                db.query('UPDATE record SET value = ?,note = ?, TID = ? WHERE RID = ?', [money, note, moneyItemID, RecodeID], (error, result) => {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log("ok now");
                        return res.status(200).redirect("/money");

                    }
                })
            });
        } catch (error) {
            console.log(error);
            return next();
        }
    } else {
        return next();
    }

}