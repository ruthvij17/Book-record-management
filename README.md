# Book-record-management

Server >>storing certain book data >>User register >>Subscriber
This is a book record management API server/ Backend for the library system or managemnet of records or manual or books.

# Fines

User :06/08/2024 - 06/11/2024
07/11/2024 =>50
09/11/2024 =>50*3 =150
For one day the fine amount will be Rs.50

# Roots and endpoints

# /users

POST: Create a new user
GET: Get all the user information here

## /users/{id}

GET: Get a user by passing their ID
PUT: Update a user by their ID
DELETE: Delete a user by ID (Check he/she still have a issued book) && (Is there any fine due to be paid)

# Subscription Types

3 months(Basic)
6 months(Standard)
12 months(Premium)

if the subscription type is Standard  && if the subscription Date 06-08-2023

# /users/subscription-details/{id}

GET: Get user subscription details
        >>Date of subscription
        >>Valid till
        >>Is there any fine

## /books
GET: Get all the books
POST: Add a new book

## /books/{id}
GET: Get the book by ID
PUT: Update a book by ID

## /books/issued
GET: Get all issued books

## /books/issued/withFine
GET: Get all issued books with their fine.

