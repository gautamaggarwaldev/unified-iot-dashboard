const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const {
  getDevices,
  getDeviceById
} = require("../controllers/deviceController");

router.get("/", auth, getDevices);
router.get("/:id", auth, getDeviceById);

module.exports = router;
