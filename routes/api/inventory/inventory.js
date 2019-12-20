const express= require('express');
const router = express.Router();
const db=require('../../JoinRoutes')

//Items model
const Inventory = require('../../../models/Inventory');



router.post('/tutorial',(req,res)=>{
const create = function(tutorial) {


  return db.Tutorial.create(tutorial).then(data => {
    console.log("\n>> Created Tutorial:\n", data);
    res.status(200).json({success:true, data})
    res.status(400).json({success:false})
   
  });
};

})

router.post('/',(req,res)=>{

    const newInventory= new Inventory({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        quantity:req.body.quantity,
        supplier:req.body.supplier,
        taxable:req.body.taxable,
    });
      
newInventory.save(function(err, Inventory){
    if(err) {
      res.status(500); 
      res.send(err);
    } else {
      res.status(200);
      res.send(Inventory); // no error!
    }
  });

   });
   
   router.get('/', (req, res) => {
    // querying all employees
    Inventory.find({}, null, {sort: {name: 1}}, function(err, inventory){
    
      if(err){
        res.status(500);
        res.send(err);
      } else {
        res.json(inventory);
      }
    });
  });
  router.get('/:id', (req, res) => {
    // querying all employees
    var _id = req.params.id;
  
    Inventory.findOne({_id: _id}, function(err, inventory){
    
      if(err){
        res.status(500);
        res.send(err);
      } else {
        res.json(inventory);
      }
    });
  });


   
  router.post("/update", (req, res) => {
    console.log("req.body", req.body);
    // inserting a new inventory
    var _id = req.body._id;
    var inventory = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      quantity: req.body.quantity,
      supplier: req.body.supplier,
      taxable: req.body.taxable
    };
  
    Inventory.findByIdAndUpdate(_id, inventory, { new: true }, function(
      err,
      inventory
    ) {
      if (err) {
        console.log("err", err);
        res.status(500).send(err);
      } else {
        console.log("success");
        res.send(inventory);
      }
    });
  });
 
  router.get('/delete/:id', (req, res) => {
    var _id = req.params.id;
    Inventory.findByIdAndRemove(_id, function(err){
      if(err) {
        res.status(500);
        res.send(err);
      } else {
        res.status(200);
        res.send();
      }
    });
  });







module.exports = router;