const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();
 
const port = process.env.PORT || 8080; 
 
const db_config = {
    host: 'localhost',
	  port: 3306,
    user: 'root', 
    password: 'root',
	  database: 'tshirtshop',
    multipleStatements: true
}

var connection;

function handleDisconnect() {
  connection = mysql.createConnection(db_config);                                                   

  connection.connect(function(err) {              
    if(err) {                                     
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000);                                               
    }                                                                              
    global.db = connection;
    console.log(`Connected to database ${db_config.host} >> ${db_config.database}`);    
  });                                                                                   
                                          
  
  /*Connectiomn TimeOut*/
  connection.on('error', function(err) {
    console.log('db error', err);
    handleDisconnect();    
  });
}

handleDisconnect();
// configure middleware
app.set('port', process.env.port || port);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

app.use(function (request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// import routes
const departmentRoutes = require('./routes/department');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const shippingRoutes = require('./routes/shipping');
const customerRoutes = require('./routes/customer');
const orderRoutes = require('./routes/order');

app.get('/', function (request, response, next) {
    db.query("SELECT * FROM category", function (error, rows) {
        return response.json(rows);
    });
});

// set routes to api
app.use('/api/department', departmentRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/product', productRoutes);
app.use('/api/shipping', shippingRoutes);
app.use('/api/customer', customerRoutes);
app.use('/api/order', orderRoutes);

// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});