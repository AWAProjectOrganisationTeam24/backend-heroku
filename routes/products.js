const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const sql = require('../db');
const multer = require('multer')
const path = require('path')
const cors = require("cors");


// Get all orders



//use
router.use(cors());
router.use(express.static("./public"))
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

//multer
const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './public/images/products')     // './public/images/' directory name where save the file
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
});



//SHOW RESTAURANT'S MENU PRODUCTS
router.get("/restaurant/:id",  (req, res) => {
    sql.query("SELECT * FROM products WHERE id_restaurant =?", [req.params.id] , function (err, result) {
        if (err) throw err;
        res.send(result);
    });

});

//SEARCH PRODUCTS BY CATEGORY
router.post('/show-category',(req,res) => {
        sql.query("SELECT * FROM products WHERE category = ?", [req.body.category] , function (err, result) {
                if (err) throw err;
                res.send(result);
            });
});


//RESTAURANT IS ADDING PRODUCT
router.post('/add-product/:id', upload.single('file'),(req,res) => {
    if (!req.file) {
        console.log("No file upload");
    } else {
        console.log(req.file.filename)
        const imgsrc = 'http://127.0.0.1:5000/images/' + req.file.filename
        sql.query("INSERT INTO products (id_restaurant, category, name, description, price, image) VALUES (?, ?, ?, ?, ?, ?)",
            [req.params.id, req.body.category, req.body.name, req.body.description, req.body.price, imgsrc], (err, result) => {
                if (err) throw err
                console.log("file uploaded")
            });
    }
});


//RESTAURANTS ID EDITING PRODUCT
router.post('/edit-product/:id', upload.single('image'),(req,res) => {
    if (!req.file) {
        sql.query("UPDATE products SET category = ?, name = ?, description = ?, price = ?, WHERE id_product = ?",
            [req.body.category, req.body.name, req.body.description, req.body.price, req.params.id]);
    } else {
        const imgsrc = 'http://127.0.0.1:3000/images/' + req.file.filename
        sql.query("UPDATE products SET category = ?, name = ?, description = ?, price = ?, image = ? WHERE id_product = ?",
        [req.body.category, req.body.name, req.body.description, req.body.price, imgsrc, req.params.id]);
        }
});

module.exports = router;
