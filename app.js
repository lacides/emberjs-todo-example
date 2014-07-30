var express = require("express");
var winston = require('winston');

var app = express();
var port = parseInt(process.env.PORT, 10) || 3000;
app.listen(port);
app.use("/", express.static(__dirname + '/generated'));

winston.info("Server running at port " + port);
