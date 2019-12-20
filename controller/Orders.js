const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const  listDatesForThePastDays =require('../utils/pastDaysPicker')
const asyncHandler = require('../middleware/async');
const Orders = require('../models/Orders');


// @desc Get all Orders
//@routes Get/api/v1/orders
//@acess  Public
exports.getOrders = asyncHandler(async (req, res, next) => {
  let query;
 
      query=Orders.find()
  
const courses =await query;

res.status(200).json({
  success:true,
  count: courses.length,
  data:courses

})
});

// @desc    Get Inventory with Orders
// Handle incoming GET requests to /inventory
//@routes   Put/api/v1/dec/inventory/:id
//@acess    Private

exports.getOrdersWithInventory =  asyncHandler(async (req, res, next) => {

  Orders.find()
    .select(" issuedBy collectedBy department name inventory quantity _id")
    .populate('inventory', 'name')
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        inventory: docs.map(doc => {
          return {
            _id: doc._id,
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
