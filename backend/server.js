require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const socketio = require("socket.io");
const http = require("http");
const ChatMessage = require("./models/ChatMessage");
const bodyParser = require("body-parser");
const liveStream = require('./models/Video')

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: ["http://localhost:3000"], // Replace with your frontend URL
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

app.use(bodyParser.json());
// Middleware
app.use(cors());
app.use(express.json());

// Define Routes
app.use("/api/live", require("./routes/stream"))
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notifications", require("./routes/notifications"));
app.use("/api/chat", require("./routes/chat"));

// Socket.io logic for real-time communication
io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("sendMessage", async (message) => {
    const newMessage = new ChatMessage({ message });
    await newMessage.save();
    io.emit("message", newMessage);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
