const express = require('express');
const router = express.Router();
const sql = require('../db');

//restaurant images
router.get(`/restaurants/:image`,  (req, res) => {
    const image = require(`/public/images/restaurants/` + req.params.image);
    res.end(image);
});

//product images
router.get(`/products/:image`,  (req, res) => {
    const image = require(`/public/images/products/` + req.params.image);
    res.end(image);
});

module.exports = router;
