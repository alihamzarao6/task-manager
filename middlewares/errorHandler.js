//  Here we are receiving the 'err.message' from 'CustomAPIError' class (which inherits this message from "Error" class) and 'err.statusCode' which is set as property of 'CustomAPIError' constructor. These both 'message' and 'statusCode' are set customely in 'task.js' controllers using 'createCustomError' which creates the new instance of 'CustomAPIError' class and pass message and statusCode to the constructor.

const { CustomAPIError } = require("../errors/customError");

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }

  return res.status(500).json({ msg: "Something went wrong, please try again" });
};

module.exports = errorHandlerMiddleware;
