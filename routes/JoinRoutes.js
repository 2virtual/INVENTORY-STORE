const express = require('express');
const jdb = require('../models')
const router = express.Router();



// Route to get all inventory 
router.get('/inventory', function(req,res) {
    jdb.Inventory.find({}, null, {sort: {name: 1}}, function(err, inventory){
    
        if(err){
          res.status(500);
          res.send(err);
        } else {
          res.json(inventory);
        }
      });
    });

// Route to get all orders
router.get("/orders", function(req,res) {
    jdb.Order.find({}, null, {sort: {name: 1}}, function(err, order){
    
        if(err){
          res.status(500);
          res.send(err);
        } else {
          res.json(order);
        }
      });
    });

// Route for creating a new Order and updating Inventory "order" field with it

router.post("/inventory/:id", function(req, res) {
    // Create a new note and pass the req.body to the entry

    jdb.Order.create(req.body)
      .then(function(order) {
        // If an Order was created successfully, find an Inventory with an `_id` equal to `req.params.id`.
        // Update the Inventory to be associated with the new Order
        // { new: true } tells the query that we want it to return the updated Inventory -- it returns the 
        //original by default
        // Since our mongoose query returns a promise, we can chain another `.then` which receives the result 
        //of the query
        return jdb.Inventory.findOneAndUpdate({ _id: req.params.id }, { orders: order._id }, { new: true });
      })
      .then(function(inventory) {
        // If we were able to successfully update an Inventory, send it back to the client
        res.json(inventory);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });


// Route for retrieving a Product by id and populating it's Review.
router.get("/inventory/:id", function(req, res) {
    // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    jdb.Inventory.findOne({ _id: req.params.id })
      // ..and populate all of the notes associated with it
      .populate({
        path:'orders',
        select:'itemName quantity issuedBy collectedBy '
      })
      .then(function(inventory) {
        // If we were able to successfully find an Product with the given id, send it back to the client
        res.json(inventory);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });


// Route for creating a new Inventory
router.post("/inventory", function(req, res) {
    jdb.Inventory.create(req.body)
      .then(function(inventory) {
        // If we were able to successfully create an Inventory, send it back to the client
        res.json(inventory);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });







  module.exports=router