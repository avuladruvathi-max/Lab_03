
# Lab 3: SQLite Database and Advanced CRUD Operations

## 1. Student Details

- **Name:** Avula Druvathi
- **Registration Number:** 252U1R9014
- **Section:** GEN AI-2A
- **Course:** Backend Development Fundamentals
- **Faculty:** Joel Prashanth D
- **Lab Number:** 03

## 2. Deployment URL

**Live Application:** http://lab-03-three.vercel.app

## 3. Objective

The objective of this lab is to develop a REST API using Node.js, Express.js and SQLite database. This project implements CRUD operations to manage book records. It also provides advanced features such as searching, sorting, pagination and price filtering with proper input validation and error handling.

## 4. Technologies Used

- Node.js
- Express.js
- SQLite
- SQLite3
- JavaScript
- npm
- Postman
- Visual Studio Code
- Git and GitHub
- Vercel

## 5. Project Structure

```text
Lab_03/
│
├── app.js
├── books.sql
├── books.db
├── package.json
├── package-lock.json
├── README.md
├── .gitignore
│
└── screenshots/
    ├── get-books.png
    ├── search.png
    ├── sorting.png
    ├── pagination.png
    ├── price-filter.png
    ├── post-success.png
    ├── put-success.png
    ├── delete-success.png
    ├── validation-error.png
    └── not-found.png
```

## 6. Database Configuration

The project uses SQLite as its database.

- Database file: `books.db`
- SQL file: `books.sql`
- Table name: `book`

The application uses the `sqlite` and `sqlite3` packages to connect to the database.

The application checks whether the `book` table exists. If the table does not exist, it executes the SQL commands from `books.sql` to create the table and insert sample records.

### Table Structure

| Column | Data Type | Description |
|---|---|---|
| id | INTEGER | Primary Key |
| title | TEXT | Book title |
| author | TEXT | Book author |
| price | INTEGER | Book price |
| pages | INTEGER | Number of pages |

## 7. API Endpoints

### 1. GET – Retrieve Books

- **Method:** GET
- **URL:** `/books`
- **Description:** Retrieves books from the database.
- **Status Code:** 200 OK

This route supports searching, sorting, pagination and price filtering.

### 2. POST – Add a New Book

- **Method:** POST
- **URL:** `/books`
- **Description:** Adds a new book to the database.
- **Status Code:** 201 Created

Example Request Body:

```json
{
  "title": "New Book",
  "author": "Druvathi",
  "price": 450,
  "pages": 300
}
```

### 3. PUT – Update Book Details

- **Method:** PUT
- **URL:** `/books/:id`
- **Description:** Updates an existing book using its ID.
- **Status Code:** 200 OK

### 4. DELETE – Delete a Book

- **Method:** DELETE
- **URL:** `/books/:id`
- **Description:** Deletes a book from the database using its ID.
- **Status Code:** 200 OK

## 8. Advanced Features

### Searching Books

Searches for books based on their title using the `search_q` query parameter.

Example:

`GET /books?search_q=Harry`

### Sorting Books

Sorts books using the `order_by` and `order` query parameters.

Example:

`GET /books?order_by=price&order=DESC`

Supported sorting columns:

- id
- title
- author
- price
- pages

Sorting order can be ASC or DESC.

### Pagination

Retrieves a specific number of records using `limit` and `offset`.

Example:

`GET /books?limit=3&offset=0`

### Price Filtering

Filters books based on minimum and maximum prices.

Example:

`GET /books?min_price=300&max_price=400`

### Combining Features

Searching, sorting, pagination and price filtering can be used together in a single GET request.

## 9. Input Validation and Error Handling

The application validates user input before performing database operations.

- Book title must not be empty.
- Author name must not be empty.
- Price must be a valid number.
- Book ID must be a positive integer.
- Limit must be a positive integer.
- Offset must be a non-negative integer.
- Minimum and maximum prices must be valid non-negative numbers.
- Minimum price cannot be greater than maximum price.
- If a book does not exist, the API returns a not-found response.
- Database errors are handled using try-catch blocks.

## 10. HTTP Status Codes

| Status Code | Description |
|---|---|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request |
| 404 | Not Found |
| 500 | Internal Server Error |

## 11. Postman API Testing

The API endpoints and additional features are tested using Postman.

The following screenshots are included as proof of testing:

1. GET All Books
2. Search Books
3. Sorting Books
4. Pagination
5. Price Filtering
6. POST New Book
7. PUT Update Book
8. DELETE Book
9. Validation Error
10. Not Found Error

## 12. Git Ignore Configuration

A `.gitignore` file is included to prevent unnecessary files and folders from being tracked by Git.

The following entries are used:

```gitignore
node_modules/
.env
*.log
npm-debug.log*
.DS_Store
Thumbs.db
.vscode/
```

This keeps the GitHub repository clean by excluding dependencies, environment files and unnecessary local files.

## 13. How to Run the Project

**Step 1:** Open the project folder in Visual Studio Code.

**Step 2:** Install the required dependencies.

```bash
npm install
```

**Step 3:** Start the application.

```bash
node app.js
```

**Step 4:** The server runs at:

`http://localhost:3000/`

**Step 5:** Open Postman and test the API using the GET, POST, PUT and DELETE methods.

## 14. Conclusion

This lab helped me understand how to connect an Express.js application with an SQLite database and perform CRUD operations. I learned how to retrieve, add, update and delete book records using REST API routes. I also implemented searching, sorting, pagination and price filtering. Through Postman testing, I gained practical experience in API testing, input validation and error handling. I also learned how to organize project files using Git and GitHub.
