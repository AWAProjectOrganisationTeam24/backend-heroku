const mysql = require('mysql');

const con = mysql.createConnection({
    host: "us-cdbr-east-05.cleardb.net",
    user: "bfdaaf3b63a0af",
    password: "6e95799a",
    database:"heroku_9001abd67b65c78"
});

//mysql://bfdaaf3b63a0af:6e95799a@us-cdbr-east-05.cleardb.net/heroku_9001abd67b65c78?reconnect=true
// mysql://b75ac4e3bb1efc:1ebef5af@us-cdbr-east-04.cleardb.com/heroku_57ceb6976b5c753?reconnect=true
/*
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"awa_project"
});

*/
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = con;