// Create web server 

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const comments = require('./comments');

app.use(bodyParser.json());

app.get('/comments', (req, res) => {
  res.json(comments);
});

app.get('/comments/:id', (req, res) => {
  const { id } = req.params;
  const comment = comments.find(comment => comment.id === parseInt(id));
  if (comment) {
    res.json(comment);
  } else {
    res.status(404).send('Comment not found');
  }
});

app.post('/comments', (req, res) => {
  const { id, text } = req.body;
  const newComment = { id, text };
  comments.push(newComment);
  res.json(newComment);
});

app.put('/comments/:id', (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const comment = comments.find(comment => comment.id === parseInt(id));
  if (comment) {
    comment.text = text;
    res.json(comment);
  } else {
    res.status(404).send('Comment not found');
  }
});

app.delete('/comments/:id', (req, res) => {
  const { id } = req.params;
  const index = comments.findIndex(comment => comment.id === parseInt(id));
  if (index !== -1) {
    comments.splice(index, 1);
    res.json({ message: 'Comment deleted' });
  } else {
    res.status(404).send('Comment not found');
  }
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});