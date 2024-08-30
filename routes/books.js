const express = require("express");

//const { getAllBooks } = require("../controllers/book-controller.js");

const { books } = require("../data/books.json");
const { users } = require("../data/users.json");

const { userModal, bookModal } = require("../modals/index.js");
const {
  getAllBooks,
  getSingleBookById,
  getAllIssuedBooks,
  addNewBook,
  updateBookById,
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

router.get("/", getAllBooks);

/**
 * Route: /books/id
 * Method:GET
 * Description: Gettin a book by id
 * Access: Public
 * Parameters: ID
 */

router.get("/:id", getSingleBookById);

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

router.post("/", addNewBook);

/**
 * Route: /{id}
 * Method:PUT
 * Description: Updating a book
 * Access: Public
 * Parameters: ID
 * Data: id,name,author,genre,price,publisher
 */

router.put("/updateBook/:id", updateBookById);

/**
 * Route: /{id}
 * Method:PUT
 * Description: Updating a book
 * Access: Public
 * Parameters: ID
 * Data: id,name,author,genre,price,publisher
 */
