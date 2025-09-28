const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());

// CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Auto-load all routes from /routes
const routesPath = path.join(__dirname, "..", "routes");
if (fs.existsSync(routesPath)) {
  fs.readdirSync(routesPath).forEach((file) => {
    if (file.endsWith(".js")) {
      const routeName = file.replace(".js", "");
      const route = require(path.join(routesPath, file));
      app.use(`/${routeName}`, route);
      console.log(`- Loaded route: /${routeName}`);
    }
  });
}

app.get("/", (req, res) => {
  res.json({ message: "API is alive" });
});

module.exports = app;
