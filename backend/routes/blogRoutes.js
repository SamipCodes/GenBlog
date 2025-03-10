const express = require("express");
const Blog = require("../models/blogModel");
const router = express.Router();
const { OpenAI } = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await openai.completions.create({
      model: "gpt-4",
      prompt: `Write a blog post about: ${prompt}`,
      max_tokens: 500,
    });
    res.json({ content: response.choices[0].text.trim() });
  } catch (error) {
    res.status(500).json({ error: "OpenAI Error" });
  }
});


router.post("/", async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const newBlog = new Blog({ title, content, author });
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Not Found" });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedBlog);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
