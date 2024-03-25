//create a web server
const express = require("express");
const app = express();
const path = require("path");

//middleware
app.use(express.static("public"));
app.use(express.json());

//array of comments
let comments = [
  {
    id: 1,
    username: "Alice",
    comment: "Hello from Alice",
  },
  {
    id: 2,
    username: "Bob",
    comment: "Hello from Bob",
  },
  {
    id: 3,
    username: "Charlie",
    comment: "Hello from Charlie",
  },
];

//GET /comments
//send back all comments
app.get("/comments", (req, res) => {
  res.send(comments);
});

//POST /comments
//create a new comment
app.post("/comments", (req, res) => {
  const comment = req.body;
  comments.push(comment);
  res.send(comment);
});

//PUT /comments/:id
//update a comment
app.put("/comments/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const newComment = req.body.comment;
  const comment = comments.find((comment) => comment.id === id);
  comment.comment = newComment;
  res.send(comment);
});

//DELETE /comments/:id
//delete a comment
app.delete("/comments/:id", (req, res) => {
  const id = parseInt(req.params.id);
  comments = comments.filter((comment) => comment.id !== id);
  res.send({});
});

//start the server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});