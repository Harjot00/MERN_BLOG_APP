const express = require("express");
const router = express.Router();
const users = require("../Models/Users");
const { blogs } = require("../Models/Blogs");
const { upload, cloudinary } = require("./middleware");

router.get("/allBlogs", async (req, res) => {
  let allBlogs;
  try {
    allBlogs = await blogs.find({}).populate("user");
  } catch (err) {
    return res.status(404).json(err);
  }
  res.status(200).json(allBlogs);
});

router.post("/newBlog/:id", upload.single("image"), async (req, res) => {
  let blogAuthor;
  const result = await cloudinary.uploader.upload(req.file.path, {
    folder: "mern-blogapp-images",
  });
  try {
    blogAuthor = await users.findOne({ _id: req.params.id });
    if (!blogAuthor) {
      return res.status(404).json({ message: "user not found" });
    }

    const newBlog = blogs({
      title: req.body.title,
      description: req.body.description,
      image: result.secure_url,
      user: blogAuthor._id,
    });

    await newBlog.save();
    blogAuthor.blogPosts.push(newBlog._id);
    await blogAuthor.save();

    return res.status(200).json(blogAuthor);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.put("/edit/:id", upload.single("image"), async (req, res) => {
  try {
    if (req.file.path !== undefined) {
      const imageURL = await blogs.findById(req.params.id);

      await cloudinary.uploader.destroy(imageURL);
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "mern-blogapp-images",
      });

      await blogs
        .findByIdAndUpdate(req.params.id, {
          title: req.body.title,
          description: req.body.description,
          image: result.secure_url,
        })
        .then(() => {
          return res.status(200).json(blog);
        });
    } else {
      await blogs
        .findByIdAndUpdate(req.params.id, {
          title: req.body.title,
          description: req.body.description,
        })
        .then(() => {
          return res.status(200).json(blog);
        });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/blogs/:id", async (req, res) => {
  let blog;
  try {
    blog = await blogs.findById(req.params.id).populate("user");
  } catch (err) {
    return res.status(500).json(err);
  }

  if (!blog) {
    return res.status(404).json({ msg: "No blog found" });
  }

  res.status(200).json({
    title: blog.title,
    description: blog.description,
    author: blog.user.username,
    image: blog.image,
  });
});

router.delete("/delete/:id", async (req, res) => {
  try {
    await blogs.findByIdAndDelete(req.params.id);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
