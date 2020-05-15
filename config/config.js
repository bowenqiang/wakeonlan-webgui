module.exports = {
    dev: {
        db: {
            url: "mongodb://localhost:27017/wakeonlan"
        }
        
    },
    production: {
        db: {
            url: "mongodb://192.168.123.98:27017/wakeonlan"
        } 
    }
}
