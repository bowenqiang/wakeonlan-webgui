const db = require("../models/index");
var spawn = require('child_process');              // spawn process
var os = require('os');                            // OS access
const Devices = db.devices;
var url = require('url');
const netList = require('network-list');
const util = require('util');


// Find all devices
exports.fetchDevicesList = async () => {
    try {
        const devicesList = await Devices.find({});
        return devicesList.map(device => (
            {
                id: device._id,
                hostname: device.hostname,
                mac_address: device.mac_address,
                ip4_address: device.ip4_address,
                ip6_address: device.ip6_address,
            }
        ));
    } catch (e) {
        return e;
    }

};


