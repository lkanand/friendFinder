var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var app = express();

var arrayOfFriends = require("./app/data/friends.js");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.port || 3000;

app.listen(port, function(){
	console.log("App listening on port: " + port);
});

require("./app/routing/apiRoutes.js")(app, arrayOfFriends);
require("./app/routing/htmlRoutes.js")(app, path);




