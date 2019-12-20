const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Orders = require('../models/Orders');
const Inventory = require('../models/Inventory');


// @desc    Get all inventory
//@routes   Get/api/v1/inventory
//@acess    Public
exports.getAllInventory =  asyncHandler(async (req, res, next) => {

  let query;
// Copy req.query
  const reqQuery ={...req.query}

// fields to exclude
removeFields=['select','sort','page','limit']

// Loop over removeFields and delete them from reqQuery
removeFields.forEach(param=>delete reqQuery[param]);


// create query string
  let queryStr= JSON.stringify(reqQuery);

  // Create operators($gte,$lte...)
  queryStr = queryStr.replace
  (/\b(gt|gte|lt|lte|in)\b/g,match=>`$${match}`)

// Finding resource
  query = Inventory.find(JSON.parse(queryStr)).populate('orders')

  // select Field
  if(req.query.select){
          const field=req.query.select.split(',').join(' ')
          query = query.select(field)
  }

  // sort

  if(req.query.sort){
          const sortBy = req.query.sort.split(',').join(' ')
          query = query.sort(sortBy)
  }else{

          query=query.sort('-createdAt')
  }

//Pagination

const page =parseInt(req.query.page,10) || 1;
const limit = parseInt(req.query.limit,10)||25
const startIndex =(page-1)*limit;
const endIndex =page*limit;
const total= await Inventory.countDocuments();

query=query.skip(startIndex).limit(limit)

// executing our query
  const inventory = await query
// Pagination result
const pagination = {}
if(endIndex < total){
pagination.next = {
  page:page+1,
  limit
}
}

if(startIndex > 0){
  pagination.prev={
       page:page-1,
       limit   
  }
}


  res.json(inventory);

});

exports.getAllInventoryWithOrders =  asyncHandler(async (req, res, next) => {
  Inventory
  .find({})
  .populate('orders')
  .exec((err, results) => { if (err) throw err; res.json(results); })
})


// api/v1/inventory/neworder:id
exports.createNewOrderWithInventory =  asyncHandler(async (req, res, next) => {
  Orders.create(req.body)
      .then((order)=> {
        
        return Inventory.findOneAndUpdate({ _id: req.params.id }, { orders: order._id }, { new: true });
      })
      .then(function(inventory) {
      
        res.json(inventory);
      })
      .catch(function(err) {
        
        res.json(err);
      });
  });


// @desc    Create new Inventory
//@routes   Post/api/v1/inventory
//@access    Private
exports.createInventory = asyncHandler(async (req, res, next) => {
  
  const inventory = await Inventory.create(req.body);
  res.status(201).json({
      success: true,
      data: inventory
  })


});



// @desc    Get a single inventory
//@routes   Get/api/v1/inventory/:id
//@acess    Public

exports.getInventory = asyncHandler(async (req, res, next) => {
   
  const inventory = await Inventory.findById(req.params.id);

  if(!inventory){
return  next( 
new ErrorResponse(`Inventory not found with id of ${req.params.id}`, 404 )
)
  }

  return res.status(200).json({success: true, data: inventory})


});

// @desc    Update inventory
//@routes   Put/api/v1/inventory/:id
//@acess    Private

exports.updateInventory = (req, res, next) => {
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

}

// @desc    Delete inventory
//@routes   Delete/api/v1/inventory/:id
//@acess    Private

exports.deleteInventory = asyncHandler(async(req, res, next) => {
    
  const inventory = await Inventory.findById(req.params.id);
  if(!inventory){
      return  next( new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404 ))
  }

  inventory.remove();

  res.status(200).json({success:true,data:{}})
  

})


// @desc    Decrement inventory
//@routes   Put/api/v1/dec/inventory/:id
//@acess    Private

exports.decInventory = async(req, res, next) => {
    var id = req.params.id;
    try {
        const inventory = await Inventory.findOneAndUpdate({_id :id}, 
            {$inc : {quantity : 1}})
        if(inventory>0){
           return  res.status(400).json({success:false})
        }
        res.status(200).json({success:true,data:inventory})
        
    } catch (error) {
        res.status(400).json({
            success: false
        })
    }

}
// @desc    Increment inventory
//@routes   Put/api/v1/inc/inventory/:id
//@acess    Private

exports.incInventory = async(req, res, next) => {
    var id = req.params.id;
    try {
        const inventory = await Inventory.findOneAndUpdate({_id :id}, 
            {$inc : {quantity : -1}})
        if(inventory>0){
           return  res.status(400).json({success:false})
        }
        res.status(200).json({success:true,data:inventory})
        
    } catch (error) {
        res.status(400).json({
            success: false
        })
    }

}


   
// @desc    Get Inventory with Orders
// Handle incoming GET requests to /inventory
//@routes   Put/api/v1/dec/inventory/:id
//@acess    Private

exports.getInventoryWithOrders =  asyncHandler(async (req, res, next) => {

  Inventory.find()
    .select("_id name quantity orders ")
    .populate( 'orders','name')
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        inventory: docs.map(doc => {
          return {
            _id: doc._id,
            name:doc.name,
            orders: doc.orders,
            quantity: doc.quantity,
            request: {
              type: "GET",
              url: "http://localhost:5000/orders/" + doc._id
            }
          };
        })
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});



  // @desc Get one Inventory
//@routes   Get/api/inventory/:id
//@acess    Private
exports.getOneInventory =  asyncHandler(async (req, res, next) => {

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


// @desc      Get inventories
// @route     GET /api/v1/inventory/all
// @route     GET /api/v1/order/:orderId/inventory
// @access    Public
exports.getInventories = asyncHandler(async (req, res, next) => {

  if (req.params.orderId) {
 Inventory.find({},(err, inventory)=>{
  return  res.status(200).json({success : true, inventory})
  res.status(400).json({ success: false})
 })
  }else{
    Inventory.find({},{order: req.params.orderId},(err, inventory)=>{
      return  res.status(200).json({success : true, inventory})
      res.status(400).json({ success: false})
     }).populate({
      path : 'Order',
      select:'inventory'
     })
  }
});
