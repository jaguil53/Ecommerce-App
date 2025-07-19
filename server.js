const express = require("express");

// Importing necessary modules and middleware
const connectDatabase = require("./app/database/databaseInit");
const { SERVER_PORT } = require("./app/constants");
const errorHandler = require("./app/middleware/errorHandlers");

const productRouter = require("./app/routes/productRoutes");
const cartRouter = require("./app/routes/cartRoutes");
const orderRouter = require("./app/routes/orderRoutes");
const categoryRouter = require("./app/routes/categoryRoutes");
const userRouter = require("./app/routes/userRoutes");

const app = express();

var cors = require("cors");

app.use(cors());

// Connecting to the database
connectDatabase();

// Parsing incoming requests as JSON and handling errors
app.use(express.json());
app.use(errorHandler);

var requestBodyParser = require("body-parser");

// Parsing request bodies
app.use(requestBodyParser.json({ limit: "5mb" }));
app.use(
  requestBodyParser.urlencoded({
    limit: "5mb",
    extended: true,
    parameterLimit: 50000,
  })
);

// Using routers for different API endpoints
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/carts", cartRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/users", userRouter);

// Endpoint to check if the server is running
app.get("/PING", (_, res) => {
  res.status(200).json({
    message: "PONG",
  });
});

// Starting the server
app.listen(SERVER_PORT, () => {
  console.log(`Server is running at port : ${SERVER_PORT}`);
});