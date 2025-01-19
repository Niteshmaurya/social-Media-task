const express = require("express");
require("dotenv").config();
const dbConnect = require("./config/database");
const userRoutes = require("./routes/user");
const app = express();
const path = require("path");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const PORT = process.env.PORT || 4001;


const allowedOrigin = "https://social-media-task-frontend-38fq.onrender.com";


app.use(
  cors({
    origin: allowedOrigin,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);


app.use(express.json());
app.use("/api/v1/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/v1", userRoutes);


dbConnect();


const server = http.createServer(app);


const io = new Server(server, {
  cors: {
    origin: allowedOrigin,
    methods: ["GET", "POST"],
    credentials: true,
  },
});


io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("newEmployee", (userData) => {
    console.log("Broadcasting new user:", userData);
    io.emit("userCreated", userData);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});


server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Allowed CORS Origin: ${allowedOrigin}`);
});


app.get("/", (req, res) => {
  res.send("<h1>Server is Running on </h1>" + PORT);
});
