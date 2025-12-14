const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 5500;

// Parse form data (application/x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));

// Serve static files from /public
app.use(express.static(path.join(__dirname, "public")));

// Optional: make / the home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Handle contact form submissions
app.post("/contact", (req, res) => {
  const { name, email, phone, topic, message } = req.body;

  // Basic server-side validation (keep it simple and solid)
  if (!name || !email || !topic || !message) {
    return res.status(400).send("Missing required fields.");
  }

  const entry = {
    name: name.trim(),
    email: email.trim(),
    phone: (phone || "").trim(),
    topic: topic.trim(),
    message: message.trim(),
    submittedAt: new Date().toISOString(),
  };

  const filePath = path.join(__dirname, "submissions.json");

  let existing = [];
  if (fs.existsSync(filePath)) {
    try {
      existing = JSON.parse(fs.readFileSync(filePath, "utf8") || "[]");
    } catch {
      existing = [];
    }
  }

  existing.push(entry);
  fs.writeFileSync(filePath, JSON.stringify(existing, null, 2), "utf8");

  // Send user back to contact page with a success flag
  res.redirect("/contact.html?sent=1");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
