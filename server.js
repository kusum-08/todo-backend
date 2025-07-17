const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");

// Config
dotenv.config();

// MongoDB Connection
connectDB();

// App init
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/v1/user", require("./routes/userRoute"));
app.use("/api/v1/todo", require("./routes/todoRoute"));

// Test route (for Render)
app.get("/", (req, res) => {
  res.send("API is working!");
});

// PORT
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
