// Import the database class from better-sqlite3
const Database = require("better-sqlite3");

// ########## Create connection with database ##########
const db = new Database("blog.db");

function getAllPosts(req, res) {
  const getAllPostsQuery = `SELECT * FROM posts`;
  const stmt = db.prepare(getAllPostsQuery);
  const posts = stmt.all();
  return res.json(posts);
}

function postBlog(req, res) {
  const body = req.body;
  const lengthOfBody = Object.keys(body).length;

  if (!lengthOfBody) {
    return res
      .status(400)
      .json({ message: "Body is malformed or doesn't exist." });
  }

  const insertQuery = `
    INSERT INTO posts (content)
    VALUES (?)
  `;

  const stmt = db.prepare(insertQuery);
  stmt.run([body.content]);

  return res
    .status(201)
    .json({ message: "The new post was successfully created" });
}

module.exports = {
  getAllPosts,
  postBlog,
};
