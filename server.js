const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT =  process.env.PORT || 3000;

const notes = require("./db/db.json");

function displayNotes(res) {
    res.sendFile(path.join(__dirname,'','./public/notes.html'));
}

function displayIndex(res) {
    res.sendFile(path.join(__dirname,'',"./public/index.html"));
}

// Routes
app.get("/notes", (req, res) => {
    displayNotes(res);
});

app.get("/api/notes", (req, res) => {
    res.send(notes);
});

app.get("*", (req, res) => {
    displayIndex(res);
});


// Listener
app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
});