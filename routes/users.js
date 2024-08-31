const express = require("express");

const {
  getAllUsers,
  getSingleUserById,
  deleteUser,
  updateUserById,
  createNewUser,
} = require("../controllers/user-controller.js");

const { users } = require("../data/users.json");

const { userModal, bookModal } = require("../modals/index.js");

const router = express.Router();

module.exports = router;
/**
 * Route: /users
 * Method:GET
 * Description: Get all users
 * Access: Public
 * Parameters: none
 */

router.get("/", getAllUsers);

/**
 * Route: /users/:id
 * Method:GET
 * Description: Getting a single user by their ID
 * Access: Public
 * Parameters: ID
 */

router.get("/:id", getSingleUserById);

/**
 * Route: /users/
 * Method:POST
 * Description: Creating a new user
 * Access: Public
 * Parameters: None
 */

// creating a new user
router.post("/", createNewUser);

/**
 * Route: /users/:id
 * Method:PUT
 * Description: Updating user by their ID
 * Access: Public
 * Parameters: ID
 */

router.put("/:id", updateUserById);

/**
 * Route: /users/:id
 * Method:PUT
 * Description: Deleting user by their ID
 * Access: Public
 * Parameters: ID
 */

router.delete("/:id", deleteUser);

/**
 * Route: users/subscriptions-details/{id}
 * Method:GET
 * Description: Get all user subscription details
 * Access: Public
 * Parameters: ID
 */

router.get("/subscription-details/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id === id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User with the id did not exist",
    });
  }
  const getDateInDays = (data = "") => {
    let date;
    if (data === "") {
      date = new Date();
    } else {
      date = new Date(data);
    }
    let days = Math.floor(date / (1000 * 60 * 60 * 24));
    return days;
  };
  const subscriptionType = (date) => {
    //let date;
    if (user.subscriptionType == "Basic") {
      date = date + 90;
    } else if (user.subscriptionType == "Standard") {
      date = date + 180;
    } else if (user.subscriptionType == "Premium") {
      date = date + 365;
    }
    return date;
  };
  let returnDate = getDateInDays(user.returnDate);
  let currentDate = getDateInDays();
  let subscriptionDate = getDateInDays(user.subscriptionDate);
  let subscriptionExpiration = subscriptionType(subscriptionDate);
  // console.log("SubscriptionExpiration:", subscriptionExpiration);
  // console.log("Current date:", currentDate);
  // console.log(subscriptionExpiration - currentDate);

  const data = {
    ...user,
    subscriptionExpired: subscriptionExpiration <= currentDate,
    daysLeftForExpiration:
      subscriptionExpiration <= currentDate
        ? 0
        : subscriptionExpiration - currentDate,
    fine:
      returnDate <= currentDate
        ? subscriptionDate <= currentDate
          ? 100
          : 50
        : 0,
  };
  return res.status(200).json({
    success: true,
    message: "Subscription details for the user is:",
    data,
  });
});
