const express = require('express');
const router = express.Router();
const {
    createEmployee,
    updateEmployee,
    getAllEmployee,
    getSumOfEmployee,
    getOneEmployee,
    getEmployeeDetail,
    getEmployeeLabel,
    getEmployeeLabelS,
    deleteEmployee,
    getTotalEmployee,
    getEmployeeAttendance,
    getSumOfEmployeeAttendance,
    getGhostEmployeeAttendance,
    getEmployeeAttendanceMonthly
   
  } = require('../controller/Employee')

  router
.route('/all')
.get(getAllEmployee)

  router
.route('/attendance')
.get(getEmployeeAttendance)

  router
.route('/monthattendance')
.get(getEmployeeAttendanceMonthly)

  router
.route('/sumattendance')
.get(getSumOfEmployeeAttendance)

  router
.route('/ghostworker')
.get(getGhostEmployeeAttendance)


  router
.route('/employeeTotal')
.get(getTotalEmployee)

  router
.route('/:id')
.get(getOneEmployee)

  router
.route('/detail/:id')
.get(getEmployeeDetail)

  router
.route('/mark/:id/:date/:label')
.get(getEmployeeLabel)

  router
.route('/all/mark/:date/:label')
.get(getEmployeeLabelS)

router
.route('/entries').get(getSumOfEmployee)

  router
.route('/add')
.post(createEmployee)

router
.route('/update')
.post(updateEmployee)

router
.route('/delete/:id')
.delete(deleteEmployee)

module.exports = router;