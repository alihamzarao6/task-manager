// 'Error' is built-in js module/class. We made a class 'CustomAPIError' which extends with this built-in module and whenever we make an instance of 'CustomAPIError' it'll invoke the contructor method automatically. And we are passing message and statusCode inside this constructor as parameters. Then we invoke the constructor method of super class 'Error' and passed that 'message' parameter to it so that we can inherit this error message inside CustomAPIError and pass it to 'errorHandlerMiddleware' method (errorHandlerMiddleware always receive the error using error.message which is coming from 'Error' class like 'Error('Task not found')'and we extended 'CustomAPIError' class to "Error" so we can use the property of "Error" inside CustomAPIError and then also received statusCode of 'CustomAPIError' using error.statusCode).

class CustomAPIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

// here we are creating a new instance of 'CustomAPIError' class inside a function.
const createCustomError = (message, statusCode) => {
  return new CustomAPIError(message, statusCode);
};

module.exports = { createCustomError, CustomAPIError };
