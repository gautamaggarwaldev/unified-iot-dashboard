require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const startPublisher = require("./publisher");
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


app.use("/api/devices", require("./routes/deviceRoutes"));
app.use("/api/telemetry", require("./routes/telemetryRoutes"));

app.get("/", (req, res) => {
  res.status(200).send("Backend Alive");
});

initSocket(server);


const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);

  // AUTO START MQTT SIMULATOR (FREE DEPLOY SOLUTION)
  if (process.env.ENABLE_SIMULATOR === "true") {
    startPublisher();
  }
});
