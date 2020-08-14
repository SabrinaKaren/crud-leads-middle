var express = require('express');

// Routes Require
var proxyAuth = require('./src/app/routes/proxy-auth.js');
var proxyStatus = require('./src/app/routes/proxy-status.js');
var proxyLead = require('./src/app/routes/proxy-lead.js');

var app = express();

// Body access
app.use(express.json())

// Routes
app.use('/proxy/auth', proxyAuth);
app.use('/proxy/status', proxyStatus);
app.use('/proxy/lead', proxyLead);

app.get("/", (req, res, next) => {
    res.json({"Response": "It's working"});
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
