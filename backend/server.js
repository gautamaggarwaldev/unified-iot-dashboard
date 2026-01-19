require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");

const connectDB = require("./config/db");

const { initSocket } = require("./socket/socketHandler");

// MQTT
require("./mqtt/subscriber");

const app = express();
const server = http.createServer(app);

app.use(cors({
  origin: "*",
  methods: ["GET","POST"]
}));

app.use(express.json());


connectDB();


app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/devices", require("./routes/deviceRoutes"));
app.use("/api/telemetry", require("./routes/telemetryRoutes"));


initSocket(server);


const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
