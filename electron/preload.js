// Preload Script
const { contextBridge } = require("electron");

// this should print out the value of MY_ENVIRONMENT_VARIABLE
console.log("process.env = ", process.env);
console.log("SNAP_URLx = ", process.env.SNAP_URL);
console.log("DEVICE_ID=", process.env.DEVICE_ID);

// contextBridge.exposeInMainWorld("process_env", process.env);
// contextBridge.exposeInMainWorld("device1", process.env.DEVICE_ID);
// contextBridge.exposeInMainWorld("device1", process.env.DEVICE_ID);
contextBridge.exposeInMainWorld("DEVICE_MAN", "man");
contextBridge.exposeInMainWorld("DEVICE_ID", process.env.DEVICE_ID);
// contextBridge.exposeInMainWorld("device2", DEVICE_ID);
