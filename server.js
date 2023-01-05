const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Load database configuration
const config = require("./config/db");

// Connect to MongoDB
mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Load models
const Ticket = require("./models/ticket");

// Load middleware
app.use(cors());
app.use(express.json());

// Load routes
const ticketsRouter = require("./routes/tickets");
app.use("/tickets", ticketsRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
