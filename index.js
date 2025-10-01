const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3333;

// Add body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



const sequelize = require("./util/db");
const models = require("./models")();
//models(); // Initialize models and associations
//simulate logged in user
app.use((req, res, next) => {
  models.User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.error(err));
});
// Routes

const productAdminRoutes = require("./routes/admin/products");
app.use("/admin", productAdminRoutes);

const productRoutes = require("./routes/products");
app.use(productRoutes);


// Sync the models with the database and start the server

sequelize
  .sync(/* {force: true} */)
  .then(() => {
    console.log("Tables created!");
    app.listen(PORT);
  })
  .catch((err) => {
    console.error("Unable to create tables, shutting down...", err);
    process.exit(1);
  });

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully to web_shop DB.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

app.get("/", (req, res) => {
  res.send("Express server is running on port 3333");
});
