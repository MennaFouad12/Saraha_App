

//asyncHandler replace try catch block and if error occur it will be handled by the global error handler
const asyncHandler = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((error)=>{ 
      return next(error)
    } );
  }
}

export default asyncHandler;