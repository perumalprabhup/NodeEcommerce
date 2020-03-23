

const express = require('express'),
    router = express.Router(),
    { GetDepartments } = require('../dataAccessLayer/department-controller'),
    cors = require('./cors');

//get all departments
router.get('/getDepartments', GetDepartments).options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); });

module.exports = router;