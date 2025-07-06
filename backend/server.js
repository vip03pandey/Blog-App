const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/UserRoutes");
const uploadRoutes=require('./routes/uploadRoutes');
const postRoutes=require('./routes/PostRoutes');




dotenv.config(); // Load env before using it
const app = express();

app.use(express.json());

// Allow all origins for dev

// Allow requests from your frontend origin
app.use(cors({
  origin: 'http://localhost:5173', // or '*' for all origins (not recommended for production)
  credentials: true // if you use cookies or authentication
}));

connectDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/users", userRoutes);
app.use('/api/upload',uploadRoutes)
app.use('/api/post', postRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
