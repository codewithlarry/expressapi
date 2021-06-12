const errorHandler = (err, req, res, next) => {
  if(err.statusCode){
    return res.status(err.statusCode).json({
      error: err.constructor.name,
      message: err.message
    });
  }else{
    return res.status(500).json({
      error: err.constructor.name,
      message: err.message
    });
  }
}

module.exports = errorHandler;