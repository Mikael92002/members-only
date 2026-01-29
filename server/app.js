const express = require("express");
const path = require("node:path");

const app = express();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
  app.get("/{*splat}", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
  });
}

app.get("/api", (req, res) => {
  res.json({ hello: "Hello world" });
});

const port = process.env.PORT || 3000;
app.listen(port, (err) => {
  if (err) {
    throw err;
  }
  console.log(`LISTENING ON ${port}`);
});
