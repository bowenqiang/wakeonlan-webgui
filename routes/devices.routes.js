module.exports = app => {
    const devices = require("../countrollers/devices.controllers");
    var router = require("express").Router();
    // Get all devices
    router.get("/", devices.fetchDevicesList);
    // Add a new device
    router.post("/", devices.addNewDevice);
     // Update a device with mac
    // router.put("/:mac", devices.update);

    //Delete a device with mac address
    router.delete("/", devices.deleteDevice);

    router.get("/scan", devices.scan);

    //Wake up a device
    router.get("/wol", devices.wakeOnLan);
    app.use("/api/devices", router);
}