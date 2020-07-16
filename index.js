const express = require('express');
const bodyParse = require('body-parser');
const app = express();
const { randomBytes } = require('crypto');
const cors = require('cors');

app.use(bodyParse.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];

  comments.push({ id: id, content });

  commentsByPostId[req.params.id] = comments;

  res.status(201).send(comments);
});

app.listen('4001', () => {
  console.log('Comments Servicess is Listenning on 4001');
});
