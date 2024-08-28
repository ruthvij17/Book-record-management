const { userModal, bookModal } = require("../modals/index.js");
const usersModals = require("../modals/users-modals.js");

const getSingleBookById = async (req, res) => {
  const { id } = req.params;
  const book = await bookModal.findById(id);

  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Book not found",
    });
  }
  return res.status(200).json({
    success: true,
    messgae: "Book Found by id",
    data: book,
  });
};

const getAllBooks = async (req, res) => {
  const books = await bookModal.find();

  if (books.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No book found",
    });
  }
  return res.status(200).json({
    success: true,
    data: books,
  });
};

const getAllIssuedBooks = async (req, res) => {
  const users = await userModal
    .find({
      issuedBook: { $exists: true },
    })
    .populate("issuedBook");
  if (issuedBooks.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No books issued",
    });
  }
  return res.status(200).json({
    succes: true,
    message: "Users with the issued books",
    data: issuedBooks,
  });
};

module.exports = { getAllBooks, getSingleBookById, getAllIssuedBooks };
