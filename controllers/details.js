const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { promisify } = require('util');
const fs = require('fs');
const { count } = require("console");
const Q = require('q')

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    port: '3306',
    multipleStatements: true,

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

                db.query('SELECT SUM(record.value) AS "sum" FROM record INNER JOIN topic_of_money ON topic_of_money.Topic_ID =record.TID WHERE (record.User_id = ? AND record.date_time >= now() - interval 30 day) AND topic_of_money.in_or_out = 1', [decoed.id], (error, result) => {
                    req.totalIn = 0;
                    if (result) {
                        req.totalIn = result[0].sum;
                    }
                });
                db.query('SELECT SUM(record.value) AS "sum" FROM record INNER JOIN topic_of_money ON topic_of_money.Topic_ID =record.TID WHERE (record.User_id = ? AND record.date_time >= now() - interval 30 day) AND topic_of_money.in_or_out = 0', [decoed.id], (error, result) => {
                    req.totalOut = 0;
                    if (result) {
                        req.totalOut = result[0].sum;
                    }
                });

                db.query('SELECT Topic_ID, name,in_or_out, priority  FROM topic_of_money WHERE User_id = ? ORDER BY topic_of_money.priority ASC', [decoed.id], (error, result) => {
                    if (result) {
                        //console.log(result);
                        req.moneyEnterIn = [];
                        req.moneyEnterOut = [];
                        let inM = 0;
                        let outM = 0;
                        for (let i = 0; i < result.length; i++) {
                            if (result[i].priority !== 1) {
                                if (result[i].in_or_out == 1) {
                                    req.moneyEnterIn[inM] = result[i];
                                    inM++;
                                } else {
                                    req.moneyEnterOut[outM] = result[i];
                                    outM++;
                                }
                            }
                        }
                        for (let i = 0; i < result.length; i++) {
                            if (result[i].priority == 1) {
                                if (result[i].in_or_out == 1) {
                                    req.moneyEnterIn[inM] = result[i];
                                    inM++;
                                } else {
                                    req.moneyEnterOut[outM] = result[i];
                                    outM++;
                                }
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
                //console.log("awaaaaaaaaaaa")

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


// update Money Title
exports.updateMoneyTitleIn = async(req, res, next) => {
    if (req.cookies.jwt) {
        try {
            // TODO: verify the token
            const decoed = await promisify(jwt.verify)(req.cookies.jwt,
                process.env.JWT_SECRET)

            // console.log(decoed);
            //console.log("awaaaaaaaaaa1")

            // TODO: cheak if still exists
            db.query('SELECT * FROM user WHERE ID = ?', [decoed.id], (error, result) => {
                //    console.log(result);

                if (!result) {
                    return next();
                }

                // create user variable
                req.user = result[0];


                const { list_data, delete_data, rename_titles, State_Change, new_items_name } = req.body;

                let listData = JSON.parse(list_data);
                let deleteData = JSON.parse(delete_data);
                let renameTitles = JSON.parse(rename_titles);
                let StateChange = JSON.parse(State_Change);
                let new_itemsName = JSON.parse(new_items_name);

                let topics = [];
                //console.log(renameTitles[0]);




                db.query('SELECT * FROM topic_of_money WHERE in_or_out = 1 AND User_id = ? ORDER BY topic_of_money.priority ASC', [decoed.id], (error, result) => {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log("ok now");
                            //return res.status(200).redirect("/money");
                            topics = result;

                            //update state changes, only delete titles
                            //UPDATE topic_of_money SET `priority` = '5' WHERE topic_of_money.Topic_ID = 14;
                            /*
                                                        let tVal1 = 0;
                                                        let tVal2 = 0;
                                                        let tVal3 = 0;

                                                        if (StateChange.length == 0) {
                                                            tVal1 = 1;
                                                        }
                                                        if (renameTitles.length == 0) {
                                                            tVal2 = 1;
                                                        }
                                                        if (listData.length == 0) {
                                                            tVal2 = 1;
                                                        }
                                                        */

                            StateChange.forEach((e, index) => {
                                if ((e.new !== e.ori) && e.new == 'delete') {
                                    db.query('UPDATE topic_of_money SET priority = 1 WHERE topic_of_money.Topic_ID = ?', [e.id], (error, result) => {
                                        if (error) {
                                            console.log(error);
                                        }
                                    });
                                }
                                //if (StateChange.length == index + 1) {
                                //    tVal1 = 1;
                                //}

                            });

                            //update title changes
                            renameTitles.forEach((e, index) => {
                                if ((e.new != e.ori)) {
                                    db.query('UPDATE topic_of_money SET name = ? WHERE topic_of_money.Topic_ID = ?', [e.new, e.id], (error, result) => {
                                        if (error) {
                                            console.log(error);
                                        }
                                    });
                                }
                                //if (renameTitles.length == index + 1) {
                                //    tVal2 = 1;
                                //}
                            });

                            //update piority and add new titles

                            let temp_len = topics.length;
                            //update piority and add new titles
                            if (topics.length < listData.length) {
                                for (let i = 0; i < (listData.length - topics.length); i++) {
                                    let temp_topic = {
                                        Topic_ID: -2,
                                        name: '',
                                        in_or_out: 1,
                                        User_id: -1,
                                        priority: -1
                                    }
                                    topics[temp_len + i] = temp_topic;

                                }
                            }

                            let tempPiority = 2;
                            for (let i = 0; i < listData.length; i++) {
                                const ld = listData[i];
                                if ((!((i + 2 == topics[i].priority) && (ld.id == topics[i].Topic_ID))) && (ld.id !== "") && (ld.id !== -1)) {
                                    db.query('UPDATE topic_of_money SET priority = ? WHERE topic_of_money.Topic_ID = ?', [i + 2, ld.id], (error, result) => {
                                        if (error) {
                                            console.log(error);
                                        }
                                    });
                                } else if (ld.id == "") {
                                    //   INSERT INTO topic_of_money(Topic_ID, name, in_or_out, User_id, priority) VALUES(NULL, 'new one', '1', '8', '10');
                                    //   db.query('INSERT INTO record SET ?', { value: money, note: note, bil_img: tempBil_img, date_time: currentdate, TID: moneyItemID, User_id: decoed.id }, (error, result) => {

                                    db.query('INSERT INTO topic_of_money SET ?', { name: ld.title, in_or_out: 1, User_id: decoed.id, priority: i + 2 }, (error, result) => {

                                    });
                                    tempPiority = tempPiority + 1;
                                    //if (listData.length == i + 1) {
                                    //    tVal3 = 1;
                                    //}

                                }
                            }

                            //if (tVal1 == 1 && tval2 == 1 && tVal3 == 1) {
                            //    return res.status(200).redirect("/money");
                            //}
                            return res.status(200).redirect("/money");
                        }
                    })
                    /**
                     * 
                     * 
                     * db.query('UPDATE record SET value = ?,note = ?, TID = ? WHERE RID = ?', [money, note, moneyItemID, RecodeID], (error, result) => {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log("ok now");
                            return res.status(200).redirect("/money");

                        }
                    })
                     * 
                     * 
                     */



            });
        } catch (error) {
            console.log(error);
            return next();
        }
    } else {
        return next();
    }

}




// update Money Title
exports.updateMoneyTitleOut = async(req, res, next) => {
    if (req.cookies.jwt) {
        try {
            // TODO: verify the token
            const decoed = await promisify(jwt.verify)(req.cookies.jwt,
                process.env.JWT_SECRET)

            // console.log(decoed);
            //console.log("awaaaaaaaaaa1")

            // TODO: cheak if still exists
            db.query('SELECT * FROM user WHERE ID = ?', [decoed.id], (error, result) => {
                //    console.log(result);

                if (!result) {
                    return next();
                }

                // create user variable
                req.user = result[0];


                const { list_data, delete_data, rename_titles, State_Change, new_items_name } = req.body;

                let listData = JSON.parse(list_data);
                let deleteData = JSON.parse(delete_data);
                let renameTitles = JSON.parse(rename_titles);
                let StateChange = JSON.parse(State_Change);
                let new_itemsName = JSON.parse(new_items_name);


                let topics = [];
                //console.log(renameTitles[0]);




                db.query('SELECT * FROM topic_of_money WHERE in_or_out = 0 AND User_id = ? ORDER BY topic_of_money.priority ASC', [decoed.id], (error, result) => {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log("ok now");
                            //return res.status(200).redirect("/money");
                            topics = result;
                            //console.log(topics[0])
                            //console.log(topics[1])

                            //update state changes, only delete titles
                            //UPDATE topic_of_money SET `priority` = '5' WHERE topic_of_money.Topic_ID = 14;
                            /*
                                                        let tVal1 = 0;
                                                        let tVal2 = 0;
                                                        let tVal3 = 0;

                                                        if (StateChange.length == 0) {
                                                            tVal1 = 1;
                                                        }
                                                        if (renameTitles.length == 0) {
                                                            tVal2 = 1;
                                                        }
                                                        if (listData.length == 0) {
                                                            tVal2 = 1;
                                                        }
                                                        */

                            StateChange.forEach((e, index) => {
                                if ((e.new !== e.ori) && e.new == 'delete') {
                                    db.query('UPDATE topic_of_money SET priority = 1 WHERE topic_of_money.Topic_ID = ?', [e.id], (error, result) => {
                                        if (error) {
                                            console.log(error);
                                        }
                                    });
                                }
                                //if (StateChange.length == index + 1) {
                                //    tVal1 = 1;
                                //}

                            });

                            //update title changes
                            renameTitles.forEach((e, index) => {
                                if ((e.new != e.ori)) {
                                    db.query('UPDATE topic_of_money SET name = ? WHERE topic_of_money.Topic_ID = ?', [e.new, e.id], (error, result) => {
                                        if (error) {
                                            console.log(error);
                                        }
                                    });
                                }
                                //if (renameTitles.length == index + 1) {
                                //    tVal2 = 1;
                                //}
                            });

                            let temp_len = topics.length;
                            //update piority and add new titles
                            if (topics.length < listData.length) {
                                for (let i = 0; i < (listData.length - topics.length); i++) {
                                    let temp_topic = {
                                        Topic_ID: -2,
                                        name: '',
                                        in_or_out: 0,
                                        User_id: -1,
                                        priority: -1
                                    }
                                    topics[temp_len + i] = temp_topic;

                                }
                            }
                            //console.log(topics[1])
                            //console.log(topics[2])

                            let tempPiority = 2;
                            for (let i = 0; i < listData.length; i++) {
                                const ld = listData[i];
                                console.log(i);
                                if ((!((i + 2 == topics[i].priority) && (ld.id == topics[i].Topic_ID))) && (ld.id !== "") && (ld.id !== -1)) {
                                    db.query('UPDATE topic_of_money SET priority = ? WHERE topic_of_money.Topic_ID = ?', [i + 2, ld.id], (error, result) => {
                                        if (error) {
                                            console.log(error);
                                        }
                                    });
                                } else if (ld.id == "") {
                                    //   INSERT INTO topic_of_money(Topic_ID, name, in_or_out, User_id, priority) VALUES(NULL, 'new one', '1', '8', '10');
                                    //   db.query('INSERT INTO record SET ?', { value: money, note: note, bil_img: tempBil_img, date_time: currentdate, TID: moneyItemID, User_id: decoed.id }, (error, result) => {

                                    db.query('INSERT INTO topic_of_money SET ?', { name: ld.title, in_or_out: 0, User_id: decoed.id, priority: i + 2 }, (error, result) => {

                                    });
                                    tempPiority = tempPiority + 1;
                                    //if (listData.length == i + 1) {
                                    //    tVal3 = 1;
                                    //}

                                }
                            }

                            //if (tVal1 == 1 && tval2 == 1 && tVal3 == 1) {
                            //    return res.status(200).redirect("/money");
                            //}
                            return res.status(200).redirect("/money");
                        }
                    })
                    /**
                     * 
                     * 
                     * db.query('UPDATE record SET value = ?,note = ?, TID = ? WHERE RID = ?', [money, note, moneyItemID, RecodeID], (error, result) => {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log("ok now");
                            return res.status(200).redirect("/money");

                        }
                    })
                     * 
                     * 
                     */



            });
        } catch (error) {
            console.log(error);
            return next();
        }
    } else {
        return next();
    }

}




exports.note = async(req, res, next) => {
    if (req.cookies.jwt) {
        try {
            // TODO: verify the token
            const decoed = await promisify(jwt.verify)(req.cookies.jwt,
                process.env.JWT_SECRET)

            //console.log(decoed);

            // TODO: cheak if still exists
            db.query('SELECT U.L_name, N.Note_ID, N.date_time, N.title, N.note FROM user U INNER JOIN note N ON U.ID = N.User_id WHERE U.ID = ?', [decoed.id], (error, result) => {
                //console.log(result);

                if (!result) {
                    return next();
                }
                // create user name
                req.user = result[0];

                req.notes = result;

                return next();
            });
        } catch (error) {
            console.log(error);
            return next();
        }
    } else {
        return next();
    }

}

exports.addnote = async(req, res, next) => {
    if (req.cookies.jwt) {
        try {
            // TODO: verify the token
            const decoed = await promisify(jwt.verify)(req.cookies.jwt,
                process.env.JWT_SECRET)

            //console.log(decoed);
            const { note, title } = req.body;
            var currentdate = new Date();

            db.query('INSERT INTO note SET ?', { title: title, note: note, User_id: decoed.id, date_time: currentdate }, (error, result) => {
                return res.status(200).redirect("/note");
            });

        } catch (error) {
            console.log(error);
            return next();
        }
    } else {
        return next();
    }

}



exports.updateNote = async(req, res, next) => {
    if (req.cookies.jwt) {
        try {
            // TODO: verify the token
            const decoed = await promisify(jwt.verify)(req.cookies.jwt,
                process.env.JWT_SECRET)

            //console.log(decoed);
            const { note, title, noteId } = req.body;
            console.log([title, note, noteId, decoed.id])


            db.query('UPDATE note SET title = ?, note = ? WHERE (note.Note_ID = ? AND note.User_id = ?) ', [title, note, noteId, decoed.id], (error, result) => {
                if (error) {
                    console.log(error);
                }
                console.log(result)
                return res.status(200).redirect("/note");

            });

        } catch (error) {
            console.log(error);
            return next();
        }
    } else {
        return next();
    }

}


exports.deleteNote = async(req, res, next) => {
    if (req.cookies.jwt) {
        try {
            // TODO: verify the token
            const decoed = await promisify(jwt.verify)(req.cookies.jwt,
                process.env.JWT_SECRET)

            //console.log(decoed);
            const { noteId } = req.body;
            let Id = parseInt(noteId);
            db.query(' DELETE FROM note WHERE (note.Note_ID = ? AND note.User_id = ? ) ', [Id, decoed.id], (error, result) => {
                if (error) {
                    console.log(error);
                }
                console.log(result)
                return res.status(200).redirect("/note");

            });

        } catch (error) {
            console.log(error);
            return next();
        }
    } else {
        return next();
    }

}



exports.addTask = async(req, res, next) => {
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

                const { list_data } = req.body;
                let data = JSON.parse(list_data);
                console.log(data);


                /** 
                                db.query('DELETE FROM record WHERE RID = ?', [RecodeID], (error, result) => {
                                    if (error) {
                                        console.log(error);
                                    } else {
                                        console.log(result);
                                        return res.status(200).redirect("/money");

                                    }
                                });
                */

                db.query('INSERT INTO `priority_list` SET ?', { User_id: decoed.id, topic: data.title, priority: 0 }, (error, result) => {
                    if (error) {
                        console.log(error);
                    } else {
                        //console.log(result);
                        //console.log(result.insertId);

                        var sql = "INSERT INTO `task` (name, pList_id, done) VALUES ?";
                        var values = []
                        data.task.forEach(element => {
                            temp = ['name', result.insertId, 0];
                            temp[0] = element.name;
                            temp[2] = element.done;
                            console.log(temp);
                            values.push(temp)
                        });

                        db.query(sql, [values], function(err) {
                            if (err) throw err;
                            return res.status(200).redirect("/task");
                        });

                    }
                });


            });
        } catch (error) {
            console.log(error);
            return next();
        }
    } else {
        return next();
    }

}






exports.getTask = async(req, res, next) => {
    if (req.cookies.jwt) {
        try {
            // TODO: verify the token
            const decoed = await promisify(jwt.verify)(req.cookies.jwt,
                process.env.JWT_SECRET)

            console.log(decoed);

            // TODO: cheak if still exists
            db.query('SELECT * FROM user WHERE ID = ?', [decoed.id], (error, result) => {
                //console.log(result);

                if (!result) {
                    return next();
                }
                req.user = result[0];


                db.query("SELECT P_ID,topic,priority FROM priority_list WHERE User_id = ?", [decoed.id], (error, result) => {
                    let items = [];
                    console.log("run")
                    if (!result) {
                        return next();
                    }
                    console.log("run1")

                    result.forEach(resu => {
                        let item = {
                            id: 0,
                            title: "",
                            priority: 0,
                            list: []
                        }
                        item.id = parseInt(resu.P_ID);
                        item.title = resu.topic;
                        item.priority = resu.priority;
                        items.push(item)
                    });
                    console.log("run2")

                    db.query("SELECT pl.P_ID,T.task_id,T.name,T.done FROM task AS T JOIN priority_list AS pl ON pl.P_ID = T.pList_id JOIN user AS U ON U.ID = pl.User_id WHERE U.ID = ?", [decoed.id], (error, result) => {
                        if (!result) {
                            console.log("run11")
                            return next();
                        }
                        result.forEach(re => {
                            items.forEach(item => {
                                if (parseInt(item.id) == parseInt(re.P_ID)) {
                                    let li = { id: 0, name: "", done: 0 };
                                    li.id = re.task_id;
                                    li.name = re.name;
                                    li.done = re.done;
                                    item.list.push(li)

                                }
                            });
                        });
                        console.log("run3")

                        req.items = items;
                        console.log("items");
                        console.log(items);
                        return next();

                    });




                });


            });
        } catch (error) {
            console.log(error);
            return next();
        }
    } else {
        return next();
    }

}




exports.deleteTask = async(req, res, next) => {
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

                var pid = req.params.id;
                console.log(pid);
                db.query(" DELETE task FROM task JOIN priority_list ON priority_list.P_ID = task.pList_id JOIN user ON user.ID = priority_list.User_id WHERE task.pList_id = ? AND user.ID = ?", [pid, decoed.id], (error, result) => {

                    if (!result) {
                        return next();
                    }
                    db.query("DELETE FROM priority_list WHERE priority_list.P_ID = ? AND priority_list.User_id = ?", [pid, decoed.id], (error, result) => {

                        if (!result) {
                            return next();
                        }
                        return next();

                    });


                });


                return next();


            });
        } catch (error) {
            console.log(error);
            return next();
        }
    } else {
        return next();
    }

}




exports.updateTask = async(req, res, next) => {
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


                const { update_list_data } = req.body;
                let data = JSON.parse(update_list_data);
                console.log(data);

                db.query('UPDATE `priority_list` SET `topic` = ? WHERE `priority_list`.`P_ID` = ?', [data.title, data.id], (error, result) => {
                    console.log(result);

                    if (!result) {
                        return next();
                    }
                    var values = data.task;
                    var queries = '';

                    values.forEach(function(item) {
                        queries += mysql.format("UPDATE task SET name = ? ,done = ? WHERE task_id = ? ;", [item.name, item.done, item.task_id]);
                    });

                    db.query(queries, (error, result) => {
                        //////////////////
                        if (data.newTask.length != 0) {
                            var sql = "INSERT INTO `task` (name, pList_id, done) VALUES ?";
                            var values = []
                            data.newTask.forEach(element => {
                                temp = ['name', data.id, 0];
                                temp[0] = element.name;
                                temp[2] = element.done;
                                console.log(temp);
                                values.push(temp)
                            });

                            db.query(sql, [values], function(err) {
                                if (err) throw err;
                                return res.status(200).redirect("/task");
                            });
                        } else {
                            return res.status(200).redirect("/task");
                        }

                        ///////////////

                    });


                });


            });
        } catch (error) {
            console.log(error);
            return next();
        }
    } else {
        return next();
    }

}



exports.dashboard = async(req, res, next) => {
    if (req.cookies.jwt) {
        try {
            // TODO: verify the token
            const decoed = await promisify(jwt.verify)(req.cookies.jwt,
                process.env.JWT_SECRET)

            //console.log(decoed);


            db.query('SELECT note FROM `note` WHERE `User_id` = ? ORDER BY Note_ID DESC LIMIT 6', [decoed.id], (error, result) => {
                //console.log(result);
                if (!result) {
                    return next();
                }
                req.user = "ok";
                req.notes = result;

                db.query('SELECT SUM(record.value) AS "sum" FROM record INNER JOIN topic_of_money ON topic_of_money.Topic_ID =record.TID WHERE (record.User_id = ? AND record.date_time >= now() - interval 30 day) AND topic_of_money.in_or_out = 1', [decoed.id], (error, result) => {
                    req.totalIn = 0;
                    if (result) {
                        req.totalIn = result[0].sum;
                    }
                    db.query('SELECT SUM(record.value) AS "sum" FROM record INNER JOIN topic_of_money ON topic_of_money.Topic_ID =record.TID WHERE (record.User_id = ? AND record.date_time >= now() - interval 30 day) AND topic_of_money.in_or_out = 0', [decoed.id], (error, result) => {
                        req.totalOut = 0;
                        if (result) {
                            req.totalOut = result[0].sum;

                            /////////////////////////////////

                            db.query("SELECT P_ID,topic,priority FROM priority_list WHERE User_id = ?", [decoed.id], (error, result) => {
                                let items = [];

                                if (!result) {
                                    return next();
                                }


                                result.forEach(resu => {
                                    let item = {
                                        id: 0,
                                        title: "",
                                        priority: 0,
                                        list: []
                                    }
                                    item.id = parseInt(resu.P_ID);
                                    item.title = resu.topic;
                                    item.priority = resu.priority;
                                    items.push(item)
                                });


                                db.query("SELECT pl.P_ID,T.task_id,T.name,T.done FROM task AS T JOIN priority_list AS pl ON pl.P_ID = T.pList_id JOIN user AS U ON U.ID = pl.User_id WHERE U.ID = ?", [decoed.id], (error, result) => {
                                    if (!result) {

                                        return next();
                                    }
                                    result.forEach(re => {
                                        items.forEach(item => {
                                            if (parseInt(item.id) == parseInt(re.P_ID)) {
                                                let li = { id: 0, name: "", done: 0 };
                                                li.id = re.task_id;
                                                li.name = re.name;
                                                li.done = re.done;
                                                item.list.push(li)

                                            }
                                        });
                                    });


                                    req.tasks = items;
                                    return next();


                                });

                            });
                            /////////////////////////////////














                        }
                    });
                });











            });




        } catch (error) {
            console.log(error);
            return next();
        }
    } else {
        return next();
    }

}