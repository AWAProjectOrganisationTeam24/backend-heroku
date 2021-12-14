const express = require('express');
const router = express.Router();
const multer = require('multer')
const path = require('path')
const cors = require("cors");
const bodyParser = require('body-parser');
const sql = require('../db');

router.use(cors());
router.use(express.static("./public"))
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));



//RESTAURANT DEFAULT LIST
router.get("/", function(req,res) {
        sql.query("SELECT * FROM restaurant", function (err, result) {
            if (err) throw err;
            res.send(result);
        });
});

//RESTAURANTS IN SEARCHED CITY
router.post("/",  function(req, res) {
    sql.query("SELECT * FROM restaurant WHERE city = ?", [req.body.city] , function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});


/// ADD RESTAURANT
// Use of Multer
const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './public/images/restaurants/')     // './public/images/' directory name where save the file
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
});

router.post('/add-restaurant/:id', upload.single('file'),(req,res) => {
    if(!req.file) {
            console.log("No file upload");
        } else {
            const imgsrc = req.file.filename;
            sql.query("INSERT INTO restaurant (name, address, id_manager, city, image, type, openHr) VALUES (?, ?, ?, ?, ?, ?, ?)",
                [req.body.name, req.body.address, req.params.id, req.body.city, imgsrc, req.body.type, req.body.openHr], (err, result) => {
                    if (err) throw err
                    console.log("file uploaded")
                });
        }
});

//EDIT RESTAURANT
router.post('/edit-restaurant/:id', upload.single('file'),(req,res) => {

    if (!req.file) {
        sql.query("UPDATE restaurant SET name = ?, address = ?, city = ?, type = ?, openHr = ? WHERE id_restaurant = ?",
            [req.body.name, req.body.address, req.body.city, req.body.type, req.body.openHr, req.params.id], (err, result) => {
                if (err) throw err
                console.log("updated")
            });
    } else {
        console.log(req.file.filename)
        const imgsrc = 'http://127.0.0.1:3000/images/' + req.file.filename
        sql.query("UPDATE restaurant SET name = ?, address = ?, city = ?, image = ?, type = ?, openHr = ? WHERE id_restaurant = ?",
            [req.body.name, req.body.address, req.body.city, imgsrc, req.body.type, req.body.openHr, req.params.id], (err, result) => {
                if (err) throw err
                console.log("file updated")
            });
    }
});

router.get('/view-restaurant/:id', (req,res) => {
    sql.query('SELECT * FROM restaurant WHERE id_manager = ?', [req.params.id], (err,result) => {
        if (err) throw err
        res.send(result);
    })
})

module.exports = router;
