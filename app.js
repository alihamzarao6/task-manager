const express = require("express");
require("dotenv").config();

const tasksRouter = require("./routes/tasks");
const dbConn = require("./db/connect");
const notFound = require("./middlewares/notFound");
const errorHandlerMiddleware = require("./middlewares/errorHandler");

const app = express();

const port = process.env.PORT || 8080;

// middlewares
app.use(express.static("./public"));
app.use(express.json());

app.use("/api/v1/tasks", tasksRouter);
app.use(notFound);
app.use(errorHandlerMiddleware);

const startServer = async () => {
  try {
    await dbConn(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`DB is Connected and Server started on port ${port}...`);
    });
  } catch (error) {
    console.log(error.message);
  }
};

startServer();
