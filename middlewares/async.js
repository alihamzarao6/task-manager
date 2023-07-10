// As we are invoking the 'asyncWrapper' inside an express app that's why we are getting 'req, res, next' and then we are passing these parameters to our function(which basically are controller but now they'll work as params og 'asyncWrapper'. Here we are returning an async funtion in which inside try block we invoke the function here which we got from params and in catch block we call the next middleware(which is 'errorHandlerMiddleware' use in app.js) by writing next(error). In complete app we call the 'errorHandlerMiddleware' middleware from errorHandler whenever we write 'next(anyError)'. We are also doing 'next(createCustomError(messsage, statusCode))' inside those functions which we defined in controllers. There we using the 'createCustomError' function which is creating a new instance of 'CustomAPIError' class(which will be used to pass the error message(created using Error's constructor) and statusCode to 'errorHandlerMiddleware' )

const asyncWrapper = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = asyncWrapper;
