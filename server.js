let sqlite = require("sqlite3").verbose();
const express = require("express");
const {logDOM} = require("@testing-library/react");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

let db = new sqlite.Database("notes");
app.post("/notes/new-note", (req, res) => {
  db.all("INSERT INTO Notes (NoteName, NoteContents, NoteDate) VALUES (?,?,?)",[req.body.title, req.body.contents, new Date().getTime()], (err)=>{
      if(err) throw err;
      if(db.rowsAffected === 0){
          console.log("fail")
      }
      console.log("Successful inserted data.");
      return res.status(200).json("Successful inserted data.");
  })
})

app.post("/notes/delete", (req, res)=>{
    let title = req.body.postTitle
    if(title === undefined){
        return res.status(403).json("contents is empty");
    };
    db.all("DELETE FROM Notes WHERE NoteName =?", [title.trim()], (err)=>{
        if(err) throw err;
        if(!this.changes){
            return res.status(401).json("Content doesn't exist");
        }
        console.log("Note has been deleted.");
        return res.status(203).json("Deleted code successfully.");
    })
})

app.get("/notes/getNotes", (req,res) =>{
    db.all("SELECT * FROM Notes", (err, rows)=>{
        if(err) throw err;
        if(rows.length===0){
            return res.json("no results found.");
        }
        return res.json(rows) && console.log("Notes being returned");
    })
})

app.post("/notes/update", (req, res)=>{
    let noteTitle = req.body.noteTitle;
    let content = req.body.noteContent;
    let dateNow = new Date().getTime();
    let originalTitle = req.body.title;
    if((originalTitle||noteTitle||content) === undefined){
        return res.status(401).json("fail");
    }
    db.all("UPDATE Notes set NoteName=?, NoteContents=?, NoteDate=? WHERE NoteName=?", [noteTitle.trim(), content.trim(), dateNow, originalTitle.trim], (err, rows)=>{
        if(err) throw err;
        if(!this.changes){
          return  res.status(401).json("Content failed to update.")
        }
        return res.status(203).json("Content updated.");
    })
})

app.listen(3001, ()=>{
    console.log("Currently listening to port 3001.")
})
