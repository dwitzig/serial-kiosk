// Modules to control application life and create native browser window
const { app, BrowserWindow } = require("electron");
const path = require("path");
require("dotenv").config();

app.on(
  "certificate-error",
  (event, webContents, url, error, certificate, callback) => {
    event.preventDefault();
    callback(true);
  }
);

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    kiosk: true,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      sandbox: false,
    },
  });

  // set up serial device privs

  mainWindow.webContents.session.on(
    "select-serial-port",
    (event, portList, webContents, callback) => {
      //Add listeners to handle ports being added or removed before the callback for `select-serial-port`
      //is called.

      console.log("SESSION EVENT", event.sender);
      console.log("SESSION portList", portList);
      // console.log("SESSION webContents", webContents);

      mainWindow.webContents.session.on("serial-port-added", (event, port) => {
        console.log("serial-port-added FIRED WITH", port);
        //Optionally update portList to add the new port
      });

      mainWindow.webContents.session.on(
        "serial-port-removed",
        (event, port) => {
          console.log("serial-port-removed FIRED WITH", port);
          //Optionally update portList to remove the port
        }
      );
      event.preventDefault();
      console.log("select-serial-port", portList);
      if (portList && portList.length > 0) {
        callback(portList[0].portId);

        // const allowedPorts = process.env["SNAP_PORTS"].split(",");
        // portList.forEach((port) => {
        //   // if (port.portName == process.env["SNAP_PORT"]) callback(port.portId);
        //   if (allowedPorts.includes(port.portName)) callback(port.portId);
        // });
      } else {
        callback(""); //Could not find any matching devices
      }
    }
  );

  mainWindow.webContents.session.setPermissionCheckHandler(
    (webContents, permission, requestingOrigin, details) => {
      // if (permission === "serial") {
      //   return true;
      // }

      return true;
    }
  );

  mainWindow.webContents.session.setDevicePermissionHandler((details) => {
    // if (details.deviceType === "serial") {
    //   return true;
    // }

    return true;
  });

  // and load the index.html of the app.
  // console.log(process.env);
  // mainWindow.loadURL("http://192.168.136/ws");
  mainWindow.loadURL(process.env["SNAP_URL"]);
  // mainWindow.setFullScreen(true);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  // app.navigator.serial.requestPort();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
