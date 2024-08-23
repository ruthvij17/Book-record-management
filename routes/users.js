const express = require("express");

const { users } = require("../data/users.json");

const router = express.Router();

module.exports = router;
/**
 * Route: /users
 * Method:GET
 * Description: Get all users
 * Access: Public
 * Parameters: none
 */

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    data: users,
  });
});

/**
 * Route: /users/:id
 * Method:GET
 * Description: Getting a single user by their ID
 * Access: Public
 * Parameters: ID
 */

router.get("/:id", (req, res) => {
  const { id } = req.params;
  //console.log(req.params);
  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User does not exist",
    });
  }
  return res.status(200).json({
    success: true,
    message: "User Found",
    data: user,
  });
});

/**
 * Route: /users/
 * Method:POST
 * Description: Creating a new user
 * Access: Public
 * Parameters: None
 */

router.post("/", (req, res) => {
  const { id, name, surname, email, subscriptionType, subscriptionDate } =
    req.body;

  const user = users.find((each) => each.id === id);

  if (user) {
    return res.status(404).json({
      message: "User with the ID already exist",
      success: false,
    });
  }
  users.push({ id, name, surname, email, subscriptionType, subscriptionDate });
  return res.status(201).json({
    success: true,
    message: "User added successfully",
    data: users,
  });
});

/**
 * Route: /users/:id
 * Method:PUT
 * Description: Updating user by their ID
 * Access: Public
 * Parameters: ID
 */

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not exist",
    });
  }
  const updateUserData = users.map((each) => {
    if (each.id === id) {
      return {
        ...each,
        ...data,
      };
    }
    return each;
  });
  return res.status(200).json({
    success: true,
    message: "User updated ",
    data: updateUserData,
  });
});

/**
 * Route: /users/:id
 * Method:PUT
 * Description: Deleting user by their ID
 * Access: Public
 * Parameters: ID
 */

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  //const { data } = req.body;
  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not exist",
    });
  }
  const index = users.indexOf(user);
  users.splice(index, 1);

  return res
    .status(200)
    .json({ success: true, message: "Deleted a user....", data: user });
});
