const express = require("express");
const path = require("path");
const fs = require("fs");
const db = require("./Develop/db/db.json");

// Sets up the Express App

const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app the handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes

app.post("/api/notes", (req, res) => {
  const newNote = req.body;
  const noteList = JSON.parse(
    fs.readFileSync(path.join(__dirname, "/Develop/db/db.json"), {
      encoding: "utf-8",
    })
  );
  if (noteList.length === 0) {
    newNote.id = 0;
  } else {
    newNote.id = noteList[noteList.length - 1].id + 1;
  }
  noteList.push(newNote);
  fs.writeFileSync(
    path.join(__dirname, "/Develop/db/db.json"),
    JSON.stringify(noteList)
  );
  res.json(newNote);
});

app.get("/api/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/Develop/db/db.json"))
);

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/Develop/public/notes.html"))
);

// Displays all notes

app.get("*", (req, res) => {
  console.log(req.url);
  if (req.url === "/") {
    res.sendFile(path.join(__dirname, "/Develop/public/index.html"));
  } else {
    res.sendFile(path.join(__dirname, "/Develop/public", req.url));
  }
});

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
