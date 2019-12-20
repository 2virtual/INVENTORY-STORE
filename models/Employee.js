const mongoose= require('mongoose');


//create Schema
const EmployeeeSchema = new mongoose.Schema({

    name: String,
    department: String,
    origin: String,
    wages:Number,
    overtime:{type:Number,
      default:0},
    joinDate: String,
    attendances: Object
},{timestamps:true});


// Create model from the schema
const Employeee = mongoose.model("Employeee", EmployeeeSchema, 'employee001');


// Export model
module.exports = Employeee;

