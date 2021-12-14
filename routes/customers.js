const express = require('express');
const router = express.Router();
const sql = require('../db');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const sessions = require('express-session');

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const jwt = require('jsonwebtoken');
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

router.use(cors());
router.use(express.json());
router.use(cookieParser());
router.use(express.urlencoded({ extended: true }));

let jwtSecretKey = null;
if(process.env.JWTKEY === undefined) {
        jwtSecretKey = require('../jwt-key.json').secret;
} else {
        jwtSecretKey = process.env.JWTKEY;
}


let options = {}

passport.use(new BasicStrategy(
    function(mail, psw, done) {

        sql.query("SELECT id_customer, firstname, lastname, mail, psw, address, city from customer WHERE mail = ?", mail, function (err, results) {
            if (err) throw err;
            const user = results;

            if(results == undefined) {
                // Username not found
                console.log("HTTP Basic username not found");
                return done(null, false, { message: "HTTP Basic username not found" });
            }

            if(bcrypt.compareSync(psw, results[0].psw) == false) {
                // Password does not match
                console.log("HTTP Basic password not matching username");
                return done(null, false, { message: "HTTP Basic password not found" });
            }
            return done(null, user);
            });
    }));



            /* Configure the passport-jwt module to expect JWT
               in headers from Authorization field as Bearer token */
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

/* This is the secret signing key.
   You should NEVER store it in code  */
options.secretOrKey = jwtSecretKey;

passport.use(new JwtStrategy(options, function(jwt_payload, done) {
        /* Here you could do some processing based on the JWT payload.
        For example check if the key is still valid based on expires property.
        */
        const now = Date.now() / 1000;
        if(jwt_payload.exp > now) {
                done(null, jwt_payload.user);
                console.log('good!');
        }
        else {// expired
                done(null, false);
        }
}));


router.get(
    '/login',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
            console.log("jwt");
            res.json(
                {
                        status: "Successfully accessed protected resource with JWT",
                        user: req.user
                }
            );
    }
);

router.post(
    '/login',
    passport.authenticate('basic', { session: false }),
    (req, res) => {
        console.log(req.body.psw);
        const body = {
            id: req.user[0].id_customer,
            email : req.user[0].mail
        };
        const payload = {
            user : body
        };

        const options = {
            expiresIn: '1d'
        }

        /* Sign the token with payload, key and options.
         */
        const token = jwt.sign(payload, jwtSecretKey, options);

        return res.json({ id_customer: req.user[0].id_customer,
            token: token
             });
    });


router.post('/edit-customer/:id', passport.authenticate('jwt', { session: false }),
    (req,res) => {

    //id comes from params not body
        sql.query("UPDATE customer SET firstname = ?, lastname = ?, mail = ?, psw = ?, address = ?, city = ? WHERE id_customer = ?",
        [req.body.firstname, req.body.lastname, req.body.mail, req.body.psw, req.body.address, req.body.city, req.params.id]);
});

router.get('/view-customer/:id',passport.authenticate('jwt', { session: false }),
    (req,res) => {

    sql.query("SELECT * FROM customer WHERE id_customer = ? ", [req.params.id] , function (err, result) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
})

module.exports = router;
