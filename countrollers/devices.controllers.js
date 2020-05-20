const db = require("../models/index");
const Devices = db.devices;
const url = require('url');
const wol = require('wol');
const netList = require('network-list');

// Find all devices
exports.fetchDevicesList = (req, res) => {
    Devices.find({})
    .then(data => {
        if (!data) {
            res.status(404).send({ message: `Not found any device list`});
        }
        else {
            res.send(data);
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).send({ message: `Error retrieving device list`});
    });

};

// Add a new device
exports.addNewDevice = (req, res) => {
    if (!req.body.hostname || !req.body.mac_address) {
        res.status(400).send({ message: "hostname or mac address can't be empty"});
        return;
    }

    const device = new Devices({
        hostname: req.body.hostname,
        mac_address: req.body.mac_address.toUpperCase(),
        ip4_address: req.body.ip4_address || "",
        ip6_address: req.body.ip6_address || "",
    });

    device.save(device)
        .then(data => {
            const homepage = url.format({
                protocol: req.protocol,
                host: req.get('host'),
            });
            res.redirect(201, homepage);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the device"
        });
    });
}

//Delete a select device
exports.deleteDevice = (req, res) => {
    const id = req.query.id;
    if (!id) {
        res.status(400).send({ message: "no device selected"});
        return;
    }

    Devices.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Device with id=${id}. Maybe Device was not found!`
          });
        } else {
            res.send({
                message: "Device was deleted successfully!"
              });
            }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Device with id=" + id
        });
      });
}

exports.wakeOnLan = (req, res) => {
    const mac_address = req.query.mac;
    if (!mac_address) {
        res.status(400).send({ message: "mac address can't be empty"});
        return;
    }
    wol.wake(mac_address, function(err, result) {
        // console.log(result);
        if (err) {
            res.status(500).send({
                message: "Could not Wake Device with mac=" + mac_address
            });
        }
        if (result) {
            res.send({
                message: "Successfully wake Device with mac=" + mac_address
            })
        }    
    });
}

exports.scan = (req, res) => {
    const options = {
        vendor: false,
    }
    const netScan = netList.scan;
    netScan(options, (err, arr) => {
        if (err) {
            res.status(500).send({
                message: "Failed to scan network"
            });
        }
        res.send(arr.filter(item => item.alive).map(item => ({
            hostname: item.hostname,
            mac_address: item.mac && item.mac.toUpperCase(),
            ip4_address: item.ip,
        })))
    })
}