// Create web server
// Create API
// Create API for comment
// Create API for comment list
// Create API for comment add
// Create API for comment delete

// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

// Set the body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Read the data
const data = fs.readFileSync('data.json');
const dataJSON = JSON.parse(data);

// Create API
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Create API for comment
app.get('/comment', (req, res) => {
  res.send(dataJSON);
});

// Create API for comment list
app.get('/comment/:id', (req, res) => {
  const id = req.params.id;
  const comment = dataJSON.filter(comment => comment.id == id);
  res.send(comment);
});

// Create API for comment add
app.post('/comment', (req, res) => {
  const id = dataJSON.length + 1;
  const name = req.body.name;
  const comment = req.body.comment;
  const newComment = {
    id: id,
    name: name,
    comment: comment
  };
  dataJSON.push(newComment);
  fs.writeFileSync('data.json', JSON.stringify(dataJSON));
  res.send(dataJSON);
});

// Create API for comment delete
app.delete('/comment/:id', (req, res) => {
  const id = req.params.id;
  const comment = dataJSON.filter(comment => comment.id != id);
  fs.writeFileSync('data.json', JSON.stringify(comment));
  res.send(comment);
});

// Run the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});