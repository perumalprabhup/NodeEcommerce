// const dotenv = require('dotenv').config();
const express = require('express'),
    bodyParser = require('body-parser'),
    router = express.Router(),
    { CreateOrder, SendTestMail } = require('../dataAccessLayer/order-controller'),
    cors = require('./cors');
    router.use(bodyParser.json());

//get all departments

router.get('/sendTestMail', SendTestMail).options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); });
router.post('/submitOrder', CreateOrder);


module.exports = router;