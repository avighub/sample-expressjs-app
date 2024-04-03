const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
app.use(express.static("public"));
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Load users from JSON file
const usersFilePath = path.join(__dirname, "users.json");
let users = [];
if (fs.existsSync(usersFilePath)) {
  users = JSON.parse(fs.readFileSync(usersFilePath, "utf8"));
}

// UI Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.get("/welcome", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// API Routes
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);
  if (user) {
    const responseData = { message: "Authenticated", email: email };
    res.status(200).json(responseData);
  } else {
    const responseData = { message: "Invalid Credentials_bug3" };
    res.status(401).json(responseData);
  }
});

app.get("/logout", (req, res) => {
  res.redirect("/");
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = server; // Export the server instance
