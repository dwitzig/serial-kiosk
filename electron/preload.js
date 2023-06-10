// Preload Script
const { contextBridge } = require("electron");

// this should print out the value of MY_ENVIRONMENT_VARIABLE
console.log(process.env.SNAP_URL);

contextBridge.exposeInMainWorld("env", {
  DEVICE_ID: process.env.DEVICE_ID,
});
