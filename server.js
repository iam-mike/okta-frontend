const express = require("express");
const path = require("path");
const app = express();
app.use(express.static(path.join(__dirname, "dist")));
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});
port = process.env.PORT || "3000";
app.listen(port, () => {
  console.log("Server for Angular up and runing " + port);
});
