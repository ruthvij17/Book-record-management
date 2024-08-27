const express = require("express");

const dotenv = require("dotenv");

const DbConnection = require("./databaseConnection.js");

dotenv.config();

const { users } = require("./data/users.json");

const userapp = require("./routes/users.js");

const booksapp = require("./routes/books.js");

const app = express();

DbConnection();

const port = 8081;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is up and running",
  });
});

app.use("/users", userapp);
app.use("/books", booksapp);

app.get("*", (req, res) => {
  res.status(404).json({
    message: "This root does not exist",
  });
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
