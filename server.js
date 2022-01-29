let express = require("express"),
  http = require("http"),
  app = require("express")(),
  server = http.createServer(app),
  bodyParser = require("body-parser");

//in the below mentioned line we are addressing the server to run on xyz environment along with port number
const PORT = process.env.PORT || 8001;

console.log("Server Started");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.all("/*", function(req, res, next) {
 
  res.header("Access-Control-Allow-Origin", "*");  
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-type,Accept,X-Access-Token,X-Key"
  );
  if (req.method == "OPTIONS") {
    res.status(200).end();
  } else {
    next();
  }
});

app.get("/", function(req, res) {
  res.send("The Server Is Up.");
});

app.use("/api/inventory", require("./api/inventory"));
app.use("/api/jobWorker", require("./api/jobWorker"));
app.use("/api/categories", require("./api/categories"));
app.use("/api/settings", require("./api/settings"));
app.use("/api/users", require("./api/users"));
app.use("/api", require("./api/transactions"));

server.listen(PORT, () => console.log(`The Server Is Listening To The PORT ${PORT}`));
