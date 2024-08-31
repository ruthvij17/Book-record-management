const { userModal, bookModal } = require("../modals/index.js");
const usersModals = require("../modals/users-modals.js");

exports.getAllUsers = async (req, res) => {
  const users = await userModal.find();
  if (users.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No users found",
    });
  }
  return res.status(200).json({
    success: true,
    message: "These are the user information:",
    data: usersModals,
  });
};

exports.getSingleUserById = async (req, res) => {
  const { id } = req.params;
  const user = await userModal.findById({ _id: id });
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
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  //const { data } = req.body;
  const user = await userModal.findOneAndDelete({ _id: id });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not exist",
    });
  }
  return res
    .status(200)
    .json({ success: true, message: "Deleted a user....", data: user });
};

exports.updateUserById = async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  const user = await userModal.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        ...data,
      },
    },
    { new: true }
  );
  return res.status(200).json({
    success: true,
    message: "User updated ",
    data: user,
  });
};

exports.createNewUser = async (req, res) => {
  const { id, name, surname, email, subscriptionType, subscriptionDate } =
    req.body;

  const newUser = await userModal.create({
    name,
    surname,
    email,
    subscriptionType,
    subscriptionDate,
  });

  return res.status(201).json({
    success: true,
    message: "User added",
    data: newUser,
  });
};
