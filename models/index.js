const Config = require("../config/config");

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = process.env.NODE_ENV === 'production' ? Config.production.db.url : Config.dev.db.url;

db.devices = require("./devices.model")(mongoose);
module.exports = db;