const express = require('express');

const {
    getAllInventory,
    getInventory,
    getOneInventory,
    createInventory,
    updateInventory,
    deleteInventory,
    incInventory,
    decInventory,
    getAllInventoryWithOrders,
    createNewOrderWithInventory,
    getInventoryWithOrders,
    getInventories
   
  } = require('../controller/Inventory');
  // include other resource routers
const orderRouter= require('./ordersRoute')
const router = express.Router();
// Re-route into other Resource router
router.use('/:inventoryId/orders',orderRouter)

  router
.route('/')
.get(getAllInventory)
.post(createInventory)

router
.route('/orders')
.get(getInventoryWithOrders )

router
.route('/inv')
.get(getInventories )



router
.route('/neworder')
.post(createNewOrderWithInventory)

router
.route('/orders').get(getAllInventoryWithOrders)

router
.route('/update')
.post(updateInventory) 

router
.route('/:id') 
.get(getInventory)
.delete(deleteInventory);

router
.route('/one/:id') 
.get(getOneInventory)

router.
route('/dec/:id')
.put(incInventory);

router.
route('/inc/:id')
.put(decInventory);




  module.exports = router;