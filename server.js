const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT =  process.env.PORT || 3000;

function displayNotes(res) {
    res.json(path.join(__dirname,'','./../public/notes.html'));
}

function displayIndex(res) {
    res.json(path.join(__dirname,'',"./../public/index.html"));
}

// Routes
app.get("/notes", (req, res) => {
    displayNotes(res);
});

app.get("*", (req, res) => {
    displayIndex(res);
});

// Listener
app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
});