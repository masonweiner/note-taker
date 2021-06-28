// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const db = require("./db.json");

//Sets up the Express app
const app = express();
const PORT = 3003;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes

//route that sends user to home page
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));

//route to the notes page
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "notes.html"))
);

//displays all notes
app.get("/api/notes", (req, res) => {
  res.json(db);
});

//gets a specified note
app.get("/api/notes/:note", (req, res) => {
  const chosen = req.params.note;

  console.log(chosen);

  for (let i = 0; i < characters.length; i++) {
    if (chosen === characters[i].routeName) {
      return res.json(characters[i]);
    }
  }

  return res.json(false);
});

// Create new note
app.post("/api/notes", (req, res) => {
  const newNote = req.body;

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newNote.routeName = newNote.name.replace(/\s+/g, "").toLowerCase();
  console.log(newNote);

  db.push(newNote);
  res.json(newNote);
});

//starts the server to begin listening
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
