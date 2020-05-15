const db = require("../models/index");
const Devices = db.devices;
var url = require('url');

// Find all devices
exports.fetchDevicesList = async () => {
    try {
        const devicesList = await Devices.find({});
        return devicesList;
    } catch (e) {
        return e;
    }

};
