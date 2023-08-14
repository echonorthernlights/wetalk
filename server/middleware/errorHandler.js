const errorHandler = (error, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = error.message;
  let stack = process.env.NODE_ENV === "development" ? error.stack : null;

  // check for mongoose bad ObjectId
  if (error.name == "CastError" && error.kind == "ObjectId") {
    message = "Resource not found !!";
    statusCode = 404;
  }

  res.status(statusCode).json({
    message,
    stack,
  });
};

export default errorHandler;
