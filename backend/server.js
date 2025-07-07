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


const allowedOrigins = [
  'http://localhost:5173', // for local dev
  'https://blog-app-djb5-git-main-vip03pandeys-projects.vercel.app' // Vercel deployed frontend
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
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
