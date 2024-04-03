const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Load users from JSON file
const usersFilePath = path.join(__dirname, "users.json");
let users = [];
if (fs.existsSync(usersFilePath)) {
  users = JSON.parse(fs.readFileSync(usersFilePath, "utf8"));
}

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);
  if (user) {
    res.redirect(`/welcome?email=${email}`);
  } else {
    res.redirect("/");
  }
});

app.get("/welcome", (req, res) => {
  const email = req.query.email;
  res.send(
    `<h1>Welcome ${email}</h1><a href="/logout">Logout</a><br><img src="/image.jpg" alt="Image" style="width: 200px; height: 200px;">`
  );
});

app.get("/logout", (req, res) => {
  res.redirect("/");
});

app.get("/image", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "image.jpg"));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
