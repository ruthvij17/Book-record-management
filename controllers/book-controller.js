const { userModal, bookModal } = require("../modals/index.js");
const usersModals = require("../modals/users-modals.js");
const issuedBook = require("../dtos/book-dtos.js");
const IssuedBook = require("../dtos/book-dtos.js");
const booksModals = require("../modals/books-modals.js");

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
  const books = await booksModals.find();

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

  const issuedBooks = users.map((each) => new IssuedBook(each));
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

const addNewBook = async (req, res) => {
  const { data } = req.body;
  if (!data) {
    return res.status(404).json({
      success: false,
      message: "No data to add",
    });
  }
  await booksModals.create(data);
  const allBooks = await booksModals.find();

  return res.status(201).json({
    success: true,
    message: "Added book successfully",
    data: allBooks,
  });
};

const updateBookById = async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  const updatedBook = await booksModals.findOneAndUpdate(
    {
      _id: id,
    },
    data,
    {
      new: true,
    }
  );
  return res.status(200).json({
    success: true,
    message: "Updated a book by their ID",
    data: updateData,
  });
};

module.exports = {
  getAllBooks,
  getSingleBookById,
  getAllIssuedBooks,
  addNewBook,
  updateBookById,
};
