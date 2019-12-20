const mongoose= require('mongoose');

// Order Schema
   const OrderSchema = mongoose.Schema({
      _id: mongoose.Schema.Types.ObjectId,
      name : String,
      quantity: { type: Number, 
         default: 1 
      },
     
   issuedBy : String,
   collectedBy: String,
   department : String,
   inventory : Object

 
},{timestamps:true});


// Create model from the schema
const Orders = mongoose.model("Orders", OrderSchema,'order');

// Export model
module.exports = Orders;


