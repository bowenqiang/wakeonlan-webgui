module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            "hostname": String,
            "mac_address": String,
            "ip4_address": String,
            "ip6_address": String,
        },
        {
            autoCreate: true
        }
    );
    
    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
    
    // schema.statics.lastUpdate = function() {
    //     return this.find({}).sort('-Date').limit(1);
    // }
    const Devices = mongoose.model("devices", schema);
    return Devices;
};