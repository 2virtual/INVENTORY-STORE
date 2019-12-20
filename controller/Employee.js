const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const  listDatesForThePastDays =require('../utils/pastDaysPicker')
const asyncHandler = require('../middleware/async');
const jdb = require('../models/index');
const Employee = require('../models/Employee');
const moment = require('moment');



// @desc Get all Employee
//@routes Get/api/v1/employee
//@acess  Public
exports.getAllEmployee =  asyncHandler(async (req, res, next) => {

    Employee.find({}, null, {sort: {name: 1}}, function(err, employees){
    
        if(err){
          res.status(500);
          res.send(err);
        } else {
          res.json(employees);
        }
      });
    });


// @desc Get Total Employee
//@routes Get/api/v1/employee/employeeTotal
//@acess  Public
exports.getTotalEmployee =  asyncHandler(async (req, res, next) => {

    Employee.collection.countDocuments({},(err, employees)=>{
    if(err){
    res.status(500);
    res.send(err);
    } else {
    res.json(employees);
    }
    });
    });
  




// @desc    Create New  Employee
//@routes   Post/api/v1/employee/add
//@acess    Public
exports.createEmployee =  asyncHandler(async (req, res, next) => {
    
    const employee = new Employee({
      name: req.body.name,
      department: req.body.department,
      origin: req.body.origin,
      wages: req.body.wages,
      overtime: req.body.overtime,
      joinDate: req.body.joinDate,
      attendances: {}
    });
    
    employee.save((err, employee)=>{
      if(err) {
        res.status(500); 
        res.send(err);
      } else {
        res.status(200).json(employee);
        
      }
    });
  
  });


  // @desc Update one Employee
//@routes   Post/api/v1/employee/update
//@acess    Public
exports.updateEmployee =  asyncHandler(async (req, res, next) => {

        const _id = req.body._id;
        const employee = {
          name: req.body.name,
          department: req.body.department,
          origin: req.body.origin,
          wages: req.body.wages,
          overtime: req.body.overtime,
          joinDate: req.body.joinDate
        };
      
        Employee.findByIdAndUpdate(_id, employee, { new: true }, function(
            err,
            employee
          ) {
            if (err) {
              console.log("err", err);
              res.status(500).send(err);
            } else {
              console.log("success");
              res.send(employee);
            }
          });
          });
      
      
      // @desc Get Sum of Employee
//@routes Get/api/v1/employee/sum
//@acess Public
exports.getSumOfEmployee =  asyncHandler(async (req, res, next) => {
        Employee.collection.countDocuments({},(err, employees)=>{
        if(err){
        res.status(500);
        res.send(err);
        } else {
        res.json(employees);
        }
        });
})

      // @desc Get One Employee
//@routes   Get/api/employee/:id
//@acess    Public
exports.getOneEmployee =  asyncHandler(async (req, res, next) => {

    var _id = req.params.id;
  
    Employee.findOne({_id: _id}, function(err, employee){
      // kalau mau send object
      // var employeeMap = {};
      // employees.forEach(function(employee) {
      //   employeeMap[employee._id] = employee;
      // });
      // res.send(employeeMap);
      if(err){
        res.status(500);
        res.send(err);
      } else {
        res.json(employee);
      }
    });
  });
  



  // @desc Get Employee Detail
//@routes   Get/api/employee/detail/:id'
//@acess    Public
exports.getEmployeeDetail =  asyncHandler(async (req, res, next) => {

    var _id = req.params.id;
  
    Employee.findOne({_id: _id}, function(err, employee){
      if(err){
        res.status(500);
        res.send(err);
      } else {
        var data = {};
        var today = new Date();
        var currentMonth = moment(today).format("MMM");
        var currentYear = moment(today).format("YYYY");
        data.employee = employee;
        data.last30Days = {
          "Present": 0, "Sick": 0, "Vacation": 0, "Absent": 0
        };
        data.last7Days = {
          "Present": 0, "Sick": 0, "Vacation": 0, "Absent": 0
        };
        data.last365Days = {
          "Present": 0, "Sick": 0, "Vacation": 0, "Absent": 0
        };
        
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        data.last12Months = [];
        data.last12MonthsData = { 
          Present: [0,0,0,0,0,0,0,0,0,0,0,0], 
          Sick: [0,0,0,0,0,0,0,0,0,0,0,0], 
          Vacation: [0,0,0,0,0,0,0,0,0,0,0,0], 
          Absent: [0,0,0,0,0,0,0,0,0,0,0,0]
        }; 
        var startingMonth = today.getMonth();
        var currMonth = startingMonth;
        for(var i = 0; i < 12; i++){
          var temp = currMonth;
          if(temp < 0) temp += 12;
          data.last12Months.push(months[temp]);
          currMonth--;
        }
        data.last12Months.reverse();
        var count = 0;
        if(!employee.attendances){
          // kalau employee belum ada record attendance, anggap semua absen
          data.last7Days.Absent = 7;
          data.last30Days.Absent = 30;
          data.last365Days.Absent = 365;
          data.last12MonthsData.Absent = [365,365,365,365,365,365,365,365,365,365,365,365];
        } else {
          // jika uda ada, maka kita perlu hitung satu satu
          while(count < 365){
            var checkedDate = moment(today).subtract(count, "days").format("YYYY-MM-DD");
            var checkedMonth = moment(checkedDate).format("MMM");
            var checkedMonthIndex = data.last12Months.indexOf(moment(checkedDate).format("MMM"));
            var checkedYear = moment(checkedDate).format("YYYY");
  
            if(!employee.attendances[checkedDate]){
              // jika tidak ada, berarti absent
              if(count < 30) data.last30Days.Absent++;
              if(count < 7) data.last7Days.Absent++;
              data.last365Days.Absent++;
  
              
              if(currentMonth === checkedMonth){
                if(currentYear === checkedYear){
                  data.last12MonthsData.Absent[checkedMonthIndex]++;
                }
              } else {
                data.last12MonthsData.Absent[checkedMonthIndex]++;
              }
            } else {
              // jika ada, cek apa itu
              var status = employee.attendances[checkedDate];
              if(count < 30) data.last30Days[status]++;
              if(count < 7) data.last7Days[status]++;
              data.last365Days[status]++;
              data.last12MonthsData[status][checkedMonthIndex]++;
            }
            count++;
          }
        }
        // console.log(data);
        res.json(data);
      }
    });
  });



  
  // @desc Get Employee date
//@routes   Get/api/employee/mark/:id/:date/:label
//@acess    Public
exports.getEmployeeLabel =  asyncHandler(async (req, res, next) => {

  var _id = req.params.id;
  var date = req.params.date;
  var label = req.params.label;
  
  var employee = {};
  var updatedField = 'attendances.'+date;
  employee[updatedField] = label;
  
  Employee.findByIdAndUpdate(_id, { $set: employee }, { new: true }, function (err, employee) {
    if (err) {
      res.status(500);
      res.send(err);
    } else {
      res.status(200);
      res.send(employee);
    }
  });
});


// @desc Get Employee date
//@routes   Get/api/employee/all/mark/:date/:label'
//@acess    Public
exports.getEmployeeLabelS =  asyncHandler(async (req, res, next) => {


    var date = req.params.date;
    var label = req.params.label;
    if(label == "Absent") label = false;
    var employee = {};
    var updatedField = 'attendances.'+date;
    employee[updatedField] = label;
  
    Employee.update({}, { $set: employee }, { multi: true }, function (err, employees) {
      if (err) {
        res.status(500);
        res.send(err);
      } else {
        res.status(200);
        res.send();
      }
    });
  });



// @desc Delete Employee 
//@routes Get'/api/employee/delete/:id'
//@acess Private
exports.deleteEmployee =  asyncHandler(async (req, res, next) => {
  
    var _id = req.params.id;
    Employee.findByIdAndRemove(_id, function(err){
      if(err) {
        res.status(500);
        res.send(err);
      } else {
        res.status(200);
        res.send();
      }
    });
  });
  
     
  // @desc Reset Employee overtime
  //@routes Get'/api/employee/resetovertime/:id'
  //@acess Private
  exports.deleteEmployee =  asyncHandler(async (req, res, next) => {


    var _id = req.params.id;
Employee.findOneAndUpdate({_id:_id},{$unset:{overtime:null}},(err,data)=>{
  res.status(200).json({data})
  res.status(400).json({success: false})
})
});

// @desc Reset overtime for All Employee 
  //@routes Get'/api/employee/resetallovertime/:id'
  //@acess Private
  exports.deleteEmployee =  asyncHandler(async (req, res, next) => {

    Employee.updateMany({},{"overtime": null},(err,data)=>{
   if(err){
     res.status(400).json({success: false})
     return
   }
res.status(200).json({data})
    })
   
  });



// @desc Get All Employee Attendance in the last 7 days
  //@routes Get'/api/employee/attendance'
  //@acess Private
  exports.getEmployeeAttendance =  asyncHandler(async (req, res, next) => {
 
  Employee.aggregate([
    {
      $match: { attendances: { $exists: true } }
    },
      { "$addFields": { 
          "numberofPresentAttendances": { 
              "$size": {
                  "$filter": {
                      "input": { "$objectToArray": "$attendances" },
                      "cond": {
                          "$and": [
                              { "$in": ["$$this.k", listDatesForThePastDays(7)] },
                              { "$eq": ["$$this.v", "Present"] }
                          ]
                      }
                  }
              }
          }
      } }
  ]).exec((err, results) => { if (err) throw err; res.json(results); })
  });

// @desc Get All Employee Attendance in the last 30 days
  //@routes Get'/api/employee/monthattendance'
  //@acess Private
  exports.getEmployeeAttendanceMonthly =  asyncHandler(async (req, res, next) => {
 
    Employee.aggregate([
      {
        $match: { attendances: { $exists: true } }
      },
        { "$addFields": { 
            "numberofPresentAttendances": { 
                "$size": {
                    "$filter": {
                        "input": { "$objectToArray": "$attendances" },
                        "cond": {
                            "$and": [
                                { "$in": ["$$this.k", listDatesForThePastDays(30)] },
                                { "$eq": ["$$this.v", "Present"] }
                            ]
                        }
                    }
                }
            }
        } }
    ]).exec((err, results) => { if (err) throw err; res.json(results); })
    });







  // @desc Get All Employee Attendance in the last 90 days
  //@routes Get'/api/employee/ghostworker'
  //@acess Private
  exports.getGhostEmployeeAttendance =  asyncHandler(async (req, res, next) => {
  
  Employee.aggregate([
    {
      $match: { attendances: { $exists: true } }
    },
      { "$addFields": { 
          "numberofPresentAttendances": { 
              "$size": {
                  "$filter": {
                      "input": { "$objectToArray": "$attendances" },
                      "cond": {
                          "$and": [
                              { "$in": ["$$this.k", listDatesForThePastDays(90)] },
                              { "$eq": ["$$this.v", "Present"] }
                          ]
                      }
                  }
              }
          }
      } }
  ]).exec((err, results) => 
  { 
    if (err) throw err; res.json(results); })
  });







// @desc Get Sum of Employee Attendances
  //@routes Get'/api/employee/sumattendance'
  //@acess Public
  exports.getSumOfEmployeeAttendance =  asyncHandler(async (req, res, next) => {
  
  Employee.aggregate([
    {
      $match: { attendances: { $exists: true } }
    },
    {
      $group: {
        _id: null,
        totalPresent: {
          $sum: {
            $size: {
              $filter: {
                input: { $objectToArray: "$attendances" },
                cond: {
                  $and: [
                    { $in: ["$$this.k", listDatesForThePastDays(7)] },
                    { $eq: ["$$this.v", "Present"] }
                  ]
                }
              }
            }
          }
        }
      }
    }
  ]).exec((err, results) => { if (err) throw err; res.json(results); })
  });


 