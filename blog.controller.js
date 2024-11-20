function postBlog(req, res) {
  const body = req.body;

  console.log("body", body);

  if (!body) {
    return res
      .status(400)
      .json({ message: "Body is malformed or doesn't exist." });
  }

  res.send("Post Blog");
}

module.exports = {
  postBlog,
};
