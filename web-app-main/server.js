require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require("passport");
const path = require("path");

// Setting up port
const connUri = process.env.MONGO_LOCAL_CONN_URL;
let PORT = process.env.PORT || 4000;

//=== 1 - CREATE APP
// Creating express app and configuring middleware needed for authentication
const app = express();

app.use(cors());

// for parsing application/json
app.use(express.json());

// for parsing application/xwww-
app.use(express.urlencoded({ extended: false }));
//form-urlencoded

// // Allow Cross-Origin Requests to and from localhost:3000
// app.use(function(req, res, next) {
// 	res.header("Access-Control-Allow-Origin", "http://localhost:3000");
// 	res.header("Access-Control-Allow-Credentials", "true");
// 	res.header("Access-Control-Allow-Headers", "Origin,Content-Type, Authorization, x-id, Content-Length, X-Requested-With");
// 	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
// 	next();
// });

app.use(express.static(__dirname + '/frontend/build'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//=== 2 - SET UP DATABASE
//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;
mongoose.connect(connUri, { useNewUrlParser: true , useCreateIndex: true});

const connection = mongoose.connection;
connection.once('open', () => console.log('MongoDB --  database connection established successfully!'));
connection.on('error', (err) => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
    process.exit();
});

//=== 4 - CONFIGURE ROUTES
//Configure Route
require('./routes/index')(app);

// Set server to static if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("/frontend/build"));
}
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./frontend/build/index.html"));
});

//=== 3 - INITIALIZE PASSPORT MIDDLEWARE
app.use(passport.initialize());
require("./middlewares/jwt")(passport);

//=== 5 - START SERVER
app.listen(PORT, () => console.log('Server running on http://localhost:'+PORT+'/'));
