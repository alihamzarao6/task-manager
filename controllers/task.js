const Task = require("../models/task");
const asyncWrapper = require("../middlewares/async");
const { createCustomError } = require("../errors/customError");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const taskID = req.params.id;
  const task = await Task.findOne({ _id: taskID });

  if (!task) {
    // here 'next()' will call the next middleware(which is 'errorHandlerMiddleware' used in app.js)  and 'createCustomError' will return a new instance of 'CustomAPIError' class and passes these two parameters 'message' and 'statusCode' to 'CustomAPIError' class. And as we are creating the instance of 'CustomAPIError' class so its constructor will automatically be called and that constructor will invoke the constructor of super class(which is 'Error' class) by 'super()' and passed message inside this like 'super(message)'.  And then this message can be accessed in 'CustomAPIError' as we extended this with 'Error' and then passed to errorHandlerMiddleware's 'error' parameter and then we also passes the statusCode as CustomAPIError's parameter 'error' and can receive the statusCode as error.statusCode.
    return next(createCustomError(`No Task with id ${taskID}`, 404));
  }

  res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res) => {
  const taskID = req.params.id;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return next(createCustomError(`No Task with id ${taskID}`, 404));
  }

  res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const taskID = req.params.id;
  const task = await Task.findOneAndDelete({ _id: taskID });

  if (!task) {
    return next(createCustomError(`No Task with id ${taskID}`, 404));
  }

  res.status(200).json({ task, message: "Deleted Successfully!" });
});

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
