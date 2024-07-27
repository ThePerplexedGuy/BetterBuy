const express = require("express");
const { errorHandler } = require("./middlewares/errorMiddleware");
require("colors");
const products = require("./data/products");
const dotenv = require("dotenv");
const connectDb = require("./config/config");
const productRoutes = require("./routes/productsRoute");
const usersRoutes = require("./routes/UsersRoute");
const orderRoutes = require("./routes/orderRoute");
const cors = require("cors"); // Add this line

dotenv.config();
// Connecting to MongoDB database
connectDb();
const app = express();

// Enable CORS
app.use(cors()); // Add this line

// Middleware body parser
app.use(express.json());

// Default route
app.get("/", (req, res) => {
  res.send("<h1>Welcome to Node Server</h1>");
});

// API routes
app.use("/api", productRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/orders", orderRoutes);
app.get("/api/config/paypal", (req, res) => {
  // res.send(process.env.PAYPAL_CLIENT_ID);
  res.send('123')
});

// Error handler middleware
app.use(errorHandler);

const PORT = 5000;
app.listen(process.env.PORT || PORT, () => {
  console.log(
    `Server Running in ${process.env.NODE_ENV} Mode on Port ${process.env.PORT || PORT}`.inverse
  );
});
