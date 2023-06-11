// Preload Script
const { contextBridge } = require("electron");

// this should print out the value of MY_ENVIRONMENT_VARIABLE
console.log("SNAP_URL = ", process.env.SNAP_URL);
console.log("DEVICE_ID", process.env.DEVICE_ID);

contextBridge.exposeInMainWorld("env", {
  DEVICE_ID: process.env.DEVICE_ID,
});
