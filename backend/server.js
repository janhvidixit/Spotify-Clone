const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const fs = require("fs");
const User = require("./models/User");

dotenv.config();
const app = express();

app.use(express.json());

app.use(cors());

// ✅ Connect to MongoDB
connectDB();

// ✅ Serve frontend correctly
const frontendPath = path.join(__dirname, "../frontend");

if (fs.existsSync(frontendPath)) {
  app.use(express.static(frontendPath));

  app.get("/", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
} else {
  console.log("⚠️ Frontend folder not found! Skipping frontend serving...");
}

// ✅ Serve assets
app.use("/assets", express.static(path.join(frontendPath, "assets")));

// ✅ API routes
const authRoutes = require("./routes/auth");
const songRoutes = require("./routes/songs");
const playlistRoutes = require("./routes/playlist");

app.use("/api/auth", authRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/playlists", playlistRoutes);

// // ✅ Add new login API (without MongoDB for now)
// const users = [{ username: "user1", password: "pass123" }];

// app.post("/api/auth/login", (req, res) => {
//   console.log("Received Login Data:", req.body); // Debugging log
//   const { username, password } = req.body;

//   const user = users.find(
//     (u) => u.username === username && u.password === password
//   );

//   if (user) {
//     res.json({ token: "mock-jwt-token-123" });
//   } else {
//     res.status(401).json({ error: "Invalid credentials" });
//   }
// });

// ✅ MongoDB Login API
// app.post("/api/auth/login", async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     // Find user by username
//     const user = await User.findOne({ username });

//     if (!user) {
//       return res.status(401).json({ error: "Invalid credentials" });
//     }

//     // Compare hashed password
//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(401).json({ error: "Invalid credentials" });
//     }

//     res.json({ token: "mock-jwt-token-123" }); // Send a mock token (replace with JWT later)
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
