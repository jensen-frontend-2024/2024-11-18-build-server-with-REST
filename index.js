// ########## Get all the packages and data we need ##########

// Imports express in to our application. This path doesn't have any periodes or slashes, it means that it looks for something inside node_modules.
const express = require("express");

// This how you import stuff from other files. "./" means that we are looking for something inside the same folder as this file (index.js). This is called a relative path,it originates from the file we are currently in.
const { blogPosts } = require("./data.js");

// ########## Create the server, and configure it. ##########

// Creates the server by invoking the express function and assigning it to the app variable.
const app = express();

// ########## Endpoints ##########

// Endpoint for getting all the blog posts
app.get("/blog-posts", (req, res) => {
  res.json(blogPosts);
});

// Enpoint for getting a blogPost by id. ":id" is a dynamic path variable that acts as a placeholder for the specific blog post with the given id we would like to get.
app.get("/blog-posts/:id", (req, res) => {
  console.log(req.params);
  res.send("Ok");
});

// ########## Start the server ##########

// Starts the server and configure which port it is listening to. Now it's ready to handle incoming requests. This line of code is usually at the bottom of the file.
app.listen(3000, () => {
  console.log("Server is listening to port 3000");
});
