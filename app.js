
const express = require('express')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const path = require('path')
const fs = require('fs')

const app = express()
app.use(express.json())

const dbPath = path.join(__dirname, 'books.db')
const sqlPath = path.join(__dirname, 'books.sql')

let db = null

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })

    // Create table and insert sample data only once
    const table = await db.get(`
      SELECT name FROM sqlite_master
      WHERE type = 'table' AND name = 'book'
    `)

    if (!table) {
      const sql = fs.readFileSync(sqlPath, 'utf8')
      await db.exec(sql)
      console.log('Database created successfully')
    }

    app.listen(3000, () => {
      console.log('Server running at http://localhost:3000/')
    })
  } catch (error) {
    console.log(`Database Error: ${error.message}`)
    process.exit(1)
  }
}

// GET: Get all books, search, sorting and filtering
app.get('/books', async (request, response) => {
  try {
    const {
      search_q = '',
      order_by = 'id',
      order = 'ASC',
      limit = '10',
      offset = '0',
      min_price,
      max_price,
    } = request.query

    const allowedColumns = ['id', 'title', 'author', 'price', 'pages']

    const sortColumn = allowedColumns.includes(order_by)
      ? order_by
      : 'id'

    const sortOrder = order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC'

    const limitValue = Number(limit)
    const offsetValue = Number(offset)

    if (
      !Number.isInteger(limitValue) ||
      limitValue < 1 ||
      !Number.isInteger(offsetValue) ||
      offsetValue < 0
    ) {
      return response.status(400).json({
        message: 'Invalid limit or offset',
      })
    }

    if (
      (min_price !== undefined &&
        (!Number.isFinite(Number(min_price)) || Number(min_price) < 0)) ||
      (max_price !== undefined &&
        (!Number.isFinite(Number(max_price)) || Number(max_price) < 0))
    ) {
      return response.status(400).json({
        message: 'Invalid price range',
      })
    }

    if (
      min_price !== undefined &&
      max_price !== undefined &&
      Number(min_price) > Number(max_price)
    ) {
      return response.status(400).json({
        message: 'Minimum price cannot exceed maximum price',
      })
    }

    let query = 'SELECT * FROM book WHERE title LIKE ?'
    const params = [`%${search_q}%`]

    if (min_price !== undefined) {
      query += ' AND price >= ?'
      params.push(Number(min_price))
    }

    if (max_price !== undefined) {
      query += ' AND price <= ?'
      params.push(Number(max_price))
    }

    query += ` ORDER BY ${sortColumn} ${sortOrder} LIMIT ? OFFSET ?`
    params.push(limitValue, offsetValue)

    const books = await db.all(query, params)

    response.status(200).json(books)
  } catch (error) {
    response.status(500).json({
      message: error.message,
    })
  }
})

// POST: Add a new book
app.post('/books', async (request, response) => {
  try {
    const {title, author, price, pages} = request.body

    if (
      typeof title !== 'string' || !title.trim() ||
      typeof author !== 'string' || !author.trim() ||
      typeof price !== 'number' || !Number.isFinite(price)
    ) {
      return response.status(400).json({
        message: 'Title, author and numeric price are required',
      })
    }

    await db.run(
      `INSERT INTO book (title, author, price, pages)
       VALUES (?, ?, ?, ?)`,
      [title.trim(), author.trim(), price, pages ?? null]
    )

    response.status(201).json({
      message: 'Book added successfully',
    })
  } catch (error) {
    response.status(500).json({
      message: error.message,
    })
  }
})

// PUT: Update a book
app.put('/books/:id', async (request, response) => {
  try {
    const {id} = request.params
    const {title, author, price, pages} = request.body

    if (
      !Number.isInteger(Number(id)) ||
      Number(id) < 1 ||
      typeof title !== 'string' || !title.trim() ||
      typeof author !== 'string' || !author.trim() ||
      typeof price !== 'number' || !Number.isFinite(price)
    ) {
      return response.status(400).json({
        message: 'Invalid book details',
      })
    }

    const result = await db.run(
      `UPDATE book
       SET title = ?, author = ?, price = ?, pages = ?
       WHERE id = ?`,
      [title.trim(), author.trim(), price, pages ?? null, Number(id)]
    )

    if (result.changes === 0) {
      return response.status(404).json({
        message: 'Book not found',
      })
    }

    response.status(200).json({
      message: 'Book updated successfully',
    })
  } catch (error) {
    response.status(500).json({
      message: error.message,
    })
  }
})

// DELETE: Delete a book
app.delete('/books/:id', async (request, response) => {
  try {
    const {id} = request.params

    if (!Number.isInteger(Number(id)) || Number(id) < 1) {
      return response.status(400).json({
        message: 'Invalid book id',
      })
    }

    const result = await db.run(
      'DELETE FROM book WHERE id = ?',
      [Number(id)]
    )

    if (result.changes === 0) {
      return response.status(404).json({
        message: 'Book not found',
      })
    }

    response.status(200).json({
      message: 'Book deleted successfully',
    })
  } catch (error) {
    response.status(500).json({
      message: error.message,
    })
  }
})

initializeDBAndServer()

module.exports = app
