const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

// const visitorRouters = require("./Routes/visitorRoute");
// app.use("/visitor", visitorRouters);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(path.join(__dirname, "static")));

app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(port, () => {
  console.log(port + "포트로 대기중 입니다.");
});
