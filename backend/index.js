import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("/about", (req, res) => {
  res.send("This is about page");
});

app.listen(8000, () => {
  console.log("server is running on port 8000");
});
