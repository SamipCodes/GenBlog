require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Blog = require("./models/blogModel");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(express.json());
app.use(cors());


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


app.get("/",async(req, res)=>{
  try {
    const { prompt } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    res.json({ message: responseText });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

  
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
