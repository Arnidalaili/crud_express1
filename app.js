const express = require("express");
const app = express();
var path = require("path");
const bodyParser = require("body-parser");
const router = require("./routes/index");
const flash = require("connect-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const login = require("./routes/siswa");
const siswa = require("./routes/siswa");
const user = require("./routes/user");

app.use(cookieParser("keyboard cat"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());

app.set("views", __dirname + "/views/");
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/script-adminlte",
  express.static(path.join(__dirname, "/node_modules/admin-lte/"))
);
app.use(function (req, res, next) {
  res.locals.stuff = {
    url: req.originalUrl
  }
  next();
});

//body parser
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

// routes
app.use("/", router);
app.use("/login", login);
app.use("/siswa", siswa);
app.use("/user", user);

const port = process.env.PORT || 3300;
app.listen(port, () => console.log(`Server start on port ${port}`));
