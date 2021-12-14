const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const sql = require('../db');
const cors = require("cors");
const cookieParser = require("cookie-parser");

router.use(cors());
router.use(express.json());
router.use(cookieParser());
router.use(express.urlencoded({ extended: false }));


router.post('/', async (req, res, next) => {

    const salt = bcrypt.genSaltSync(6);
    const hashedPassword = bcrypt.hashSync(req.body.psw, salt);

    //nefunguje
    sql.query(`SELECT * FROM customer WHERE mail = ?`, [req.body.mail], (err, results) => {
        if (err) throw err;

        if (results == undefined) {
            res.send( { message: 'Username already taken.' });
        } else {
            //save user to database
            sql.query(`INSERT INTO customer (firstname, lastname, mail, psw, address, city) VALUES (?, ?, ?, ?, ?, ?)`,
                [req.body.firstname, req.body.lastname, req.body.mail, hashedPassword, req.body.address, req.body.city],
                (err, results) => {
                    if (err) throw err;
                    res.send('signin');
                });
        }

    });
});

module.exports = router;