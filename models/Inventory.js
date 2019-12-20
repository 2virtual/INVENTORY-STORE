const mongoose= require('mongoose');


//create Schema
const InventorySchema = new mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
   name : { type: String, required: true },
   description : { type: String, required: true },
   price : { type: Number, required: true },
   quantity : { type: Number, required: true },
   supplier : String,
   taxable : Boolean,
orders: [{quantity: Number,issuedBy:String,collectedBy:String,department:String}]

},{timestamps:true});

// ,{
//    toJson:{virtuals:true},
//    toObject:{virtuals:true}
   
//    }

// Create model from the schema
const Inventory = mongoose.model("Inventory", InventorySchema);


// Export model
module.exports = Inventory;

