const express = require('express');
const app = express();
const port = 3000;
const prisma = require('./prisma.config');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/books', async (req, res) => {
  const books = await prisma.book.findMany();
  res.json(books);
});

app.get('/authors', async (req, res) => {
  const authors = await prisma.author.findMany();
  res.json(authors)
});

app.get('/genres', async (req, res) => {
  const genres = await prisma.genre.findMany();
  res.json(genres)
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;