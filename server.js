
const dotenv = require('dotenv');
const morgan = require('morgan');
const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const axios = require('axios');
const moment = require('moment');
const bodyParser = require('body-parser');
const passport = require("passport");
const colors = require('colors')
const mongoose = require('mongoose');
const  listDatesForThePastDays =require('./utils/pastDaysPicker');

const fileupload = require('express-fileupload')

// Load env vars    
dotenv.config({ path: './config/config.env' })

// connect to database
connectDB();

// Route files
const users = require("./routes/api/users");
const inventory = require('./routes/inventoryRoute');
const orders = require('./routes/ordersRoute');
const inventory2 = require('./routes/api/inventory/inventory');


const app = express();
// Body parser
app.use(express.json());

//Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// File uploading
app.use(fileupload())

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));


//mount routers

app.use("/api/users", users);
app.use("/api/v1/inventory", inventory);
app.use("/api/v1/orders", orders);
app.use("/api/inventory", inventory2);



app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

  // Passport middleware

app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes

PORT = process.env.PORT || 5000
const server = app.listen(PORT, console.log(`server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
.yellow.bold
));

//Handle unhandled promise rejections
process.on('unhandledRejection',(err,promise)=>{
    console.log(`Err:${err.message}`.red)
    // Close server & exit process
    server.close(()=>process.exit(1))
})