const express = require("express");
const fs = require("fs");
const util = require("util");
const asyncReadFile = util.promisify(fs.readFile);
const asyncWriteFile = util.promisify(fs.writeFile);
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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/notes", (req, res) => {
    displayNotes(res);
});

app.get("/api/notes", (req, res) => {
    res.json(notes);
});

app.post("/api/notes", (req, res) => {
    let notesArr = [...notes];
    notesArr.push(req.body);
    asyncWriteFile("./db/db.json", JSON.stringify(notesArr)).then(err => {
        if (err) console.log(err);
        res.end();
    })
})

app.get("*", (req, res) => {
    displayIndex(res);
});


// Listener
app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
});