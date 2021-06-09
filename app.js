let ejs = require("ejs");
let bodyParser = require("body-parser");
let cookieParser = require("cookie-parser");
let express = require("express");
let session = require("express-session");
let http = require("http");
var path = require("path");
let csurf = require("csurf");

let app = express();

app.use(bodyParser.urlencoded({ extended: false }))

process.env.port = 8009;


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

app.use(function attachCSRFToken(req, res, next){
    var token = 0; // removed csrf protection while the templates were depending on it, so I didn't remove this middleware
    res.locals.csrfToken = token;
    next(); 
});

app.use(function (req, res, next){
    res.set('Cache-Control', 'no-store');
    next();
  });


app.use("/", express.static(path.join(__dirname, "/public")));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

let login = require("./routes/login");
let user = require("./routes/user");
let site = require("./routes/site");
let list = require("./routes/list");


app.use("/", login);
app.use("/user", user);
app.use("/site", site);
app.use("/list", list);

var server = http.createServer(app);
server.listen(process.env.port);
server.on('listening', function(){
    console.log(`[0] Server listening at port ${process.env.port}`);
});
