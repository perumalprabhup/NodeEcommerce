

const express = require('express'),
    router = express.Router(),
    { GetCategories } = require('../dataAccessLayer/category-controller'),
    cors = require('./cors');

//get all departments
router.get('/getCategories', GetCategories).options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); });
 

module.exports = router;