const express = require('express');

const {
    getOrders,
    getOrdersWithInventory
  
} = require('../controller/Orders');
  const router = express.Router();

  router.route('/')
  .get(getOrders)

  router.route('/inventory')
  .get(getOrdersWithInventory)



  module.exports = router;