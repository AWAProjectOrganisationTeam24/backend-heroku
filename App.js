const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const flash = require('express-flash');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;


app.use(function(req, res, next) {
    //res.header('Access-Control-Allow-Origin', 'http:/localhost:3000');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'changeLater',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

const customerRouter = require('./routes/customers');
const registerRouter = require('./routes/register');
const restaurantRouter = require('./routes/restaurants');
const productRouter = require('./routes/products');
const orderRouter = require('./routes/orders');



app.use('/customer', customerRouter);
app.use('/register', registerRouter);
app.use('/', restaurantRouter);
app.use('/products', productRouter);
app.use('/orders', orderRouter);

/*
**
**** SERVER CONFIG
***
*/
let port = process.env.PORT;

if(port == null || port === "") {
    port = 5000;
}

app.listen(port, function() {
    console.log("Server started successfully");
});
