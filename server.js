const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

// Serve static files from 'public' folder
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json()); // To parse JSON POST body

// Route for main page (index.html)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Route to log visitor data sent from frontend
app.post("/log-visitor", (req, res) => {
  const { ip, city, country, referrer } = req.body;
  const logLine = `${new Date().toISOString()} | IP: ${ip} | City: ${city} | Country: ${country} | Referrer: ${referrer}\n`;

  fs.appendFile("visitors_log.txt", logLine, (err) => {
    if (err) {
      console.error("Error writing log:", err);
      return res.status(500).send("Server Error");
    }
    res.status(200).send("Logged successfully");
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


