const express = require('express');
const app = express();
const port = 3000;


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/books', (req, res) => {
  res.send('List of books will be displayed here.');
});

app.get('authors', (req, res) => {
  res.send('List of authors will be displayed here.');
});

app.get('genres', (req, res) => {
  res.send('List of genres will be displayed here.');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;