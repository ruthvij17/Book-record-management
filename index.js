const express = require("express");

const { users } = require("./data/users.json");

const app = express();

const port = 8081;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    messgae: "Server is up and running",
  });
});

/**
 * Route: /users
 * Method:GET
 * Description: Get all users
 * Access: Public
 * Parameters: none
 */

app.get("/users", (req, res) => {
  res.status(200).json({
    success: true,
    data: users,
  });
});

app.get("*", (req, res) => {
  res.status(404).json({
    message: "This root does not exist",
  });
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
