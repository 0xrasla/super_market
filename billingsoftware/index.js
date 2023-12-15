const { app, BrowserWindow } = require("electron/main");
const weightMachine = require("./data").weightMachine;
const { SerialPort } = require("serialport");
const { ipcMain } = require("electron");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });

  mainWindow.webContents.session.on(
    "select-serial-port",
    (event, portList, webContents, callback) => {
      mainWindow.webContents.session.on("serial-port-added", (event, port) => {
        console.log("serial-port-added FIRED WITH", port);
      });

      mainWindow.webContents.session.on(
        "serial-port-discovered",
        (event, port) => {
          console.log("serial-port-discovered FIRED WITH", port);
        }
      );

      mainWindow.webContents.session.on(
        "serial-port-removed",
        (event, port) => {
          console.log("serial-port-removed FIRED WITH", port);
        }
      );

      event.preventDefault();
      if (portList && portList.length > 0) {
        callback(portList[0].portId);
      } else {
        callback("");
      }
    }
  );

  mainWindow.webContents.session.setPermissionCheckHandler(
    (webContents, permission, requestingOrigin, details) => {
      if (permission === "serial" && details.securityOrigin === "file:///") {
        return true;
      }

      return false;
    }
  );

  mainWindow.webContents.session.setDevicePermissionHandler((details) => {
    if (details.deviceType === "serial" && details.origin === "file://") {
      return true;
    }

    return false;
  });

  mainWindow.loadFile("index.html");

  mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();

  //   select serial
  mainWindow.webContents.session.on(
    "select-serial-port",
    async (event, portList, webContents, callback) => {
      event.preventDefault();
      const selectedPort = portList.find((device) => {
        return (
          device.vendorId === weightMachine.vendorId &&
          device.productId === weightMachine.productId
        );
      });

      if (selectedPort) {
        const port = new SerialPort({
          path: "/dev/" + selectedPort.portName,
          baudRate: 9600,
          autoOpen: false,
        });

        port.open(function (err) {
          if (err) {
            return console.log("Error opening port: ", err.message);
          }
        });

        port.on("data", (data) => {
          const weightValue = parseFloat(data.toString("utf8"));

          if (!isNaN(weightValue)) {
            const formattedWeight = `${weightValue.toFixed(2)} kg`;

            console.log("Weight:", formattedWeight);

            mainWindow.webContents.send("weight", formattedWeight);
          }
        });

        port.on("error", (err) => {
          console.error("Error:", err.message);
        });
      }
    }
  );

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
