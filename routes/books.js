const express = require("express");

//const { getAllBooks } = require("../controllers/book-controller.js");

const { books } = require("../data/books.json");
const { users } = require("../data/users.json");

const { userModal, bookModal } = require("../modals/index.js");
const {
  getAllBooks,
  getSingleBookById,
  getAllIssuedBooks,
} = require("../controllers/book-controller.js");

const router = express.Router();

module.exports = router;

/**
 * Route: /books
 * Method:GET
 * Description: Getting all books
 * Access: Public
 * Parameters: None
 */

router.get("/",getAllBooks);

/**
 * Route: /books/id
 * Method:GET
 * Description: Gettin a book by id
 * Access: Public
 * Parameters: ID
 */

router.get("/:id",getSingleBookById);

/**
 * Route: /books/issued
 * Method:GET
 * Description: Get all the issued books
 * Access: Public
 * Parameters: none
 */

router.get("/issued", getAllIssuedBooks);

/**
 * Route: /
 * Method:POST
 * Description: Adding a new book
 * Access: Public
 * Parameters: none
 * Data: id,name,author,genre,price,publisher
 */

router.post("/", (req, res) => {
  const { data } = req.body;

  if (!data) {
    return res.status(404).json({
      success: false,
      message: "No data to add",
    });
  }
  const book = books.find((each) => each.id === data.id);
  if (book) {
    return res.status(404).json({
      succes: false,
      message: "The Book ID is already exist",
    });
  }

  const allBooks = { ...books, data };
  return res.status(201).json({
    success: true,
    message: "Added book successfully",
    data: allBooks,
  });
});

/**
 * Route: /{id}
 * Method:PUT
 * Description: Updating a book
 * Access: Public
 * Parameters: ID
 * Data: id,name,author,genre,price,publisher
 */

router.put("/updateBook/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  const book = books.find((each) => each.id === id);

  if (!book) {
    return res.status(400).json({
      success: false,
      message: "Book did not found for this id",
    });
  }

  const updateData = books.map((each) => {
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
    message: "Updated a book by their ID",
    data: updateData,
  });
});

/**
 * Route: /{id}
 * Method:PUT
 * Description: Updating a book
 * Access: Public
 * Parameters: ID
 * Data: id,name,author,genre,price,publisher
 */
