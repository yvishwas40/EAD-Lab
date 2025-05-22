const express = require("express");
const bcrypt = require("bcryptjs");

const app = express();
app.use(express.json());

const users = []; // In-memory user store (resets on server restart)

// 📦 Register new user
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  // Validate input
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required." });
  }

  // Check if user exists
  const existingUser = users.find(u => u.username === username);
  if (existingUser) {
    return res.status(409).json({ message: "User already exists." });
  }

  // Hash and save
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });

  res.status(201).json({ message: "User registered successfully." });
});

// 🔐 Login user
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Validate input
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required." });
  }

  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(400).json({ message: "Invalid username or password." });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid username or password." });
  }

  res.json({ message: "Login successful!" });
});
app.get("/users", (req, res) => {
    res.json(users); // Includes hashed passwords
  });
  
// ✅ Basic root route
app.get("/", (req, res) => {
  res.send("Server is running.");
});

app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));
