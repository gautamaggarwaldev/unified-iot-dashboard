const mongoose = require("mongoose");

const telemetrySchema = new mongoose.Schema({
  deviceId: String,
  metric: String,
  value: Number,
  unit: String,
  timestamp: Date,
});

module.exports = mongoose.model("Telemetry", telemetrySchema);
