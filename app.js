var createError = require("http-errors");
var express = require("express");
var app = express();
require("dotenv").config();
var path = require("path");
var logger = require("morgan");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var Account = require("./models/account");
passport.use(
  new LocalStrategy(function (username, password, done) {
    Account.findOne({ username: username })
      .then(function (user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: "Incorrect username." });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: "Incorrect password." });
        }
        return done(null, user);
      })
      .catch(function (err) {
        return done(err);
      });
  })
);
var cookieParser = require("cookie-parser");
app.use(
  require("express-session")({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
var mongoose = require("mongoose");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var departmentRouter = require("./routes/department");
var boardRouter = require("./routes/board");
var selectorRouter = require("./routes/selector");
var resourceRouter = require("./routes/resources");
var Department = require("./models/department");
const connectionString = process.env.MONGO_CON;

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function () {
  console.log("Connection to DB succeeded");
});

// We can seed the collection if needed on server start
async function recreateDB() {
  // Delete everything
  await Department.deleteMany();
  let instance1 = new Department({
    Dept_Name: "Computer Science",
    Faculty_Strength: 120,
    Total_Intake: 3400,
  });

  instance1.save();

  let instance2 = new Department({
    Dept_Name: "Electrical Engineering",
    Faculty_Strength: 80,
    Total_Intake: 2400,
  });

  instance2.save();

  let instance3 = new Department({
    Dept_Name: "Chemical Engineering",
    Faculty_Strength: 50,
    Total_Intake: 1500,
  });

  instance3.save();
}

let reseed = true;
if (reseed) {
  recreateDB();
}

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/department", departmentRouter);
app.use("/board", boardRouter);
app.use("/selector", selectorRouter);
app.use("/resource", resourceRouter);
// passport config
// Use the existing connection
// The Account model

passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
