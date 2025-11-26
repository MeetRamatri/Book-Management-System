const express = require('express');
const app = express();
const port = 3000;
const prisma = require('./prisma.config');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.post("/books", async (req, res) => {
  const body = req.body;
  console.log(body);
  const result = await prisma.book.create({
    data: {
      title: body.title,
      summary: body.summary,
      isbn: body.isbn,
      url: body.url,
      author: {
        connect: {
          id: body.authorId
        }
      },
      genres: {
        create: body.genres.map(genreId => ({
          genre: {
            connect: {
              id: genreId
            }
          }
        }))
      }
    }
  })
  return res.status(201).json(result);
})


app.get('/books', async (req, res) => {
  const books = await prisma.book.findMany();
  res.json(books);
});

app.get('/authors', async (req, res) => {
  const authors = await prisma.author.findMany();
  res.json(authors)
});

app.post('/authors', async (req, res) => {
  const { first_name, family_name, date_of_birth, date_of_death, name, lifespan, url, books } = req.body;
  const newAuthor = await prisma.author.create({
    data: {
      first_name,
      family_name,
      date_of_birth,
      date_of_death,
      name,
      lifespan,
      url,
      books: {
        create: books
      }
    }
  });
  res.json(newAuthor);
});

app.get('/genres', async (req, res) => {
  const genres = await prisma.genre.findMany();
  res.json(genres)
});

app.post('/genres', async (req, res) => {
  const { name, url, books } = req.body;
  const newGenre = await prisma.genre.create({
    data: {
      name,
      url,
      books: {
        create: books
      }
    }
  });
  res.json(newGenre);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;