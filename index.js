const express = require("express")
const app = express();
const mysql = require("mysql")
const dotenv = require("dotenv")
dotenv.config();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.PASSWORD,
    database: 'bookshop'
})

app.use(express.json())


// GET One Book
app.get("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "SELECT * FROM books WHERE id = ?"
    db.query(q, [bookId], (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})


// GET All Book
app.get("/books", (req, res) => {
    const q = "SELECT * FROM books "
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})


// POST One Book
app.post("/books", (req, res) => {
    const q = "INSERT INTO books (`title`,`desc`,`cover`) VALUES (?)"
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover,
    ]

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err)
        return res.json("book has been created")
    })
})

// Delete Book
app.delete("/books/:id", (req, res) => {

    const bookId = req.params.id;
    const q = "DELETE FROM books WHERE id = ?";
    db.query(q, [bookId], (err, data) => {
        if (err) return res.json(err)
        return res.json("book has been deleted")
    })

})

// Update Book
app.put("/books/:id", (req, res) => {

    const bookId = req.params.id;
    const q = "UPDATE  books SET `title`= ?,`desc` = ?,`cover` = ? WHERE id = ?";
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover,
    ]
    db.query(q, [...values, bookId], (err, data) => {
        if (err) return res.json(err)
        return res.json("book has been updated")
    })
})


app.listen(3001, () => {
    console.log("Connected to port 3001")
})