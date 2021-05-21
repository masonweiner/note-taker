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

//route to show the db.json file in json format
app.get("/api/notes", (req, res) => {
  res.json(db);
});

//starts the server to begin listening
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
