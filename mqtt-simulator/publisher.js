const mqtt = require("mqtt");

const brokerUrl = "mqtt://localhost:1883";

const client = mqtt.connect(brokerUrl);

// Device Configurations
const devices = [
  { id: "device_001", type: "temperature", unit: "C", location: "Office" },
  { id: "device_002", type: "humidity", unit: "%", location: "Lab" },
  { id: "device_003", type: "air_quality", unit: "PPM", location: "Factory" },
  { id: "device_004", type: "power", unit: "W", location: "Plant" },
  { id: "device_005", type: "gps", unit: "lat-long", location: "Vehicle" },
  { id: "device_006", type: "motion", unit: "state", location: "Warehouse" }
];

client.on("connect", () => {
  console.log("MQTT Simulator Connected");

  setInterval(() => {
    devices.forEach((device) => {
      const payload = generatePayload(device);

      const topic = `iot/devices/${device.id}/telemetry`;

      client.publish(topic, JSON.stringify(payload));

      console.log("Published:", payload.deviceId, payload.value);
    });
  }, 3000); // every 3 seconds
});

// Data Generator
function generatePayload(device) {
  let value;

  switch (device.type) {
    case "temperature":
      value = (20 + Math.random() * 10).toFixed(2);
      break;

    case "humidity":
      value = (40 + Math.random() * 30).toFixed(2);
      break;

    case "air_quality":
      value = Math.floor(200 + Math.random() * 200);
      break;

    case "power":
      value = Math.floor(100 + Math.random() * 500);
      break;

    case "gps":
      value = `${(28 + Math.random()).toFixed(5)}, ${(77 + Math.random()).toFixed(5)}`;
      break;

    case "motion":
      value = Math.random() > 0.5 ? 1 : 0;
      break;
  }

  return {
    deviceId: device.id,
    deviceType: device.type,
    metric: device.type,
    value: value,
    unit: device.unit,
    location: device.location,
    timestamp: new Date().toISOString()
  };
}
