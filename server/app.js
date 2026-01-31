const express = require("express");
const path = require("node:path");
const signUpRoute = require("./routes/signUpRoute");
const logInRoute = require("./routes/logInRoute");
const userRoute = require("./routes/userRoute");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const pool = require("./db/pool");
const passport = require("passport");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  session({
    store: new pgSession({
      pool: pool,
      createTableIfMissing: true,
    }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 24 * 1000,
    },
  }),
);

require("./middleware/auth");
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/signUp", signUpRoute);
app.use("/api/logIn", logInRoute);
app.use("/api/user", userRoute);
app.get("/api", (req, res) => {
  res.json({ hello: "Hello world" });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
  app.get("/{*splat}", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
  });
}

const port = process.env.PORT || 3000;
app.listen(port, (err) => {
  if (err) {
    throw err;
  }
  console.log(`LISTENING ON ${port}`);
});
