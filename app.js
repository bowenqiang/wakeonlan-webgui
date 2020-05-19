const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models/index");

db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    })

// use res.render to load up an ejs view file

require('./routes/devices.routes')(app);

const utils = require('./utils/utils');

app.use(express.static(__dirname + '/views/pages'));

// index page 
app.get('/', (req, res) => {
    let devicesList = [];
    const init = async () => {
        try {
            devicesList = await utils.fetchDevicesList();
            res.render('pages/index', {
                devicesList: devicesList
            });
        } catch (e) {
            console.log(e);
        }
        
    }
    init();
});
app.get('/create', (req, res) => {
    res.render('pages/create');
});

app.get('/scan', (req, res) => {
    res.render('pages/scan');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});