// ########## Get all the packages and data we need ##########

// Imports express in to our application. This path doesn't have any periodes or slashes, it means that it looks for something inside node_modules.
const express = require("express");

// Import the controller methods from blog.controller.js
const { getAllPosts, postBlog } = require("./blog.controller.js");

// This how you import stuff from other files. "./" means that we are looking for something inside the same folder as this file (index.js). This is called a relative path,it originates from the file we are currently in.
let { blogPosts } = require("./data.js");

// ########## Create the server, and configure it. ##########

// Creates the server by invoking the express function and assigning it to the app variable.
const app = express();

// Parse the body object so it's available on the req object.
app.use(express.json());

// ########## Endpoints ##########

app.get("/posts", getAllPosts);
app.get("/blog-posts/:id", (req, res) => {
  const params = req.params;
  const id = params.id;

  // Down below is the destructed alternative to get the id.
  //   const { id } = req.params;

  // "Find" is an array method, that loops through the array on which it was invoked on. It runs a callback function on each element in the array and does a check. If that check is true, that element will be returned. If every check in every iteration is false, in the end, undefined will be returned.
  const blog = blogPosts.find((bp) => {
    if (bp.id === id) {
      return true;
    }

    return false;
  });

  if (blog) {
    return res.json(blog);
  }

  return res
    .status(404) // Means NOT FOUND
    .json({ message: "The blog with that id was not found" });
});
app.post("/posts", postBlog);
app.put("/blog-posts/:id", (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  if (content === undefined) {
    return res.status(400).json({ message: "The body is missing." });
  }

  const blog = blogPosts.find((bp) => bp.id === id);

  if (!blog) {
    return res
      .status(404)
      .json({ message: "The blog with that id was not found" });
  }

  blog.content = content;

  return res.json(blog);
});
app.delete("/blog-posts/:id", (req, res) => {
  const { id } = req.params;

  const blog = blogPosts.find((bp) => bp.id === id);

  if (!blog) {
    return res
      .status(404)
      .json({ message: "The blog with that id was not found" });
  }

  blogPosts = blogPosts.filter((bp) => bp.id !== id);

  return res.json({ message: "The blogpost was removed successfully" });
});

// ########## Start the server ##########

// Starts the server and configure which port it is listening to. Now it's ready to handle incoming requests. This line of code is usually at the bottom of the file.
app.listen(3000, () => {
  console.log("Server is listening to port 3000");
});
