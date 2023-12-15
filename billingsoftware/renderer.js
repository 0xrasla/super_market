const { ipcRenderer } = require("electron");

async function testIt() {
  const filters = [{ usbVendorId: 1027, usbProductId: 24577 }];
  try {
    const port = await navigator.serial.requestPort({ filters });

    ipcRenderer.on("weight", (event, formattedWeight) => {
      document.getElementById("weightDisplay").innerText = formattedWeight;
    });
  } catch (ex) {
    if (ex.name === "NotFoundError") {
      document.getElementById("device-name").innerHTML = "Device NOT found";
    } else {
      document.getElementById("device-name").innerHTML = ex;
    }
  }
}

// electron.send("request-weight");

document.getElementById("clickme").addEventListener("click", testIt);
