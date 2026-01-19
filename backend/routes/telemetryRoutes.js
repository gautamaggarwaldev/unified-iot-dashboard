const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const {
  getLatestTelemetry,
  getDeviceTelemetry
} = require("../controllers/telemetryController");

router.get("/", auth, getLatestTelemetry);
router.get("/:deviceId", auth, getDeviceTelemetry);

module.exports = router;
