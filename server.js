const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3002;
const PROJECTS_FILE = path.join(__dirname, "public", "data", "projects.json");

// Project editor: local dev only (admin/ lives outside public/, so Vercel never serves it)
const localOnly = (req, res, next) =>
  ["127.0.0.1", "::1", "::ffff:127.0.0.1"].includes(req.socket.remoteAddress) ? next() : res.sendStatus(403);

app.get("/admin", localOnly, (req, res) => res.sendFile(path.join(__dirname, "admin", "index.html")));

app.put("/api/projects", localOnly, express.json({ limit: "1mb" }), (req, res) => {
  if (!Array.isArray(req.body?.projects)) return res.status(400).send("expected { projects: [...] }");
  fs.writeFileSync(PROJECTS_FILE, JSON.stringify(req.body, null, 2) + "\n");
  res.sendStatus(204);
});

app.use(express.static(path.join(__dirname, "public"), { extensions: ["html"] }));

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
