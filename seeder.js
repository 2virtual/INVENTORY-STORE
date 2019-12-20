const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// load env variables
dotenv.config({path:'./config/config.env'});

// load models
const Employee = require('./models/Employee');
const Inventory = require('./models/Inventory');
const Orders = require('./models/Orders');

// connect to DB
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology: true
});


// Read the JSON files
const orders = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/orders.json`,'utf-8'))


    // import into DB
    const importData = async ()=>{
try {
  
    await Orders.create(orders);
    console.log('Data imported...'.green.inverse)
    process.exit()
} catch (err) {
    console.error(err)
}
    }

    // Delete data
    const deleteData = async ()=>{
        try {
            
            await Orders.deleteMany();
            console.log('Data destroyed...'.red.inverse)
            process.exit()
        } catch (err) {
            console.error(err)
        }
            }


            if(process.argv[2]=== '-i'){
          importData()
            }else if(process.argv[2]==='-d'){
                deleteData();
            }