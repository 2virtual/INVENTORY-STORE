const ErrorResponse = require('../utils/errorResponse')

const errorHandler=(err,req,res,next)=>{

    let error={...err}
    error.message=error.message
//log to console for
console.log(err);

//mongoose bad objectid
if(err.name==='CastError'){
    const message=`Inventory not found with id of ${err.value}`
    error = new ErrorResponse(message,404)
}

// mongoose duplicate key
if(err.code===11000){
const message= 'Duplicate field value entered'
error = new ErrorResponse(message,400)
}

// mongoose validation error**** read on object,values
if(err.name==='validationError'){
const message = Object.values(err.errors).map(val=>val.message)
error=new ErrorResponse(message,400)
}


res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Sever Error"
})
}
module.exports=errorHandler;