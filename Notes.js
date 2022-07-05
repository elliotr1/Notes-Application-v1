import "./Notes.css"
import {useState} from "react";
import React from "react";
import {forwardArrow, backwardsArrow, index, indexOfNote, editButton} from "./NoteFunctions/arrows";
import {jsx} from "react/jsx-runtime";
document.title = "Notes"
const Notes = () => {
    const [contents, getContent] = useState("");
    const [notes, setNotes] = useState({title: "", contents: "", noteTitle: "", noteContent: ""});

    const handleInput = (event) => {
        setNotes(({...notes, [event.target.name]: event.target.value}))
    }


    React.useEffect(() => {
        try {
            fetch("/notes/getNotes")
                .then(res => {
                        res.json().then((data) => getContent(data))
                        if (res.status === 500) {
                            return "Contents not found."
                        }
                    }
                )
        } catch (e) {
            console.log(e);
        }
    }, []);

    const test = async (event) => {
        event.preventDefault();
        let block = document.getElementsByClassName("notesContainer").item(0).getElementsByTagName("div").item(indexOfNote - 2)
        let oldTitle = block.getElementsByTagName("h3").item(1).innerText;
        try {
            let res = await fetch("notes/update", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    oldTitle: oldTitle,
                    newTitle: notes.noteTitle,
                    newContents: notes.noteContent
                })
            })

            await res.json();
            if (res.status === 203) {
                return window.location.reload();
            } else {
                console.log(res.status);
            }
        } catch (e) {
            console.error(e);
        }
    }
    const deleteNotes = async ()=>{
        let block = document.getElementsByClassName("notesContainer").item(0).getElementsByTagName("div").item(indexOfNote-2)
        let val = block.getElementsByTagName("h3").item(1).innerText;
        try{
            let res = await fetch("notes/delete",
                {method: "POST",
                headers:{"Content-Type": "application/json"},
                body: JSON.stringify({postTitle:val})})
            await res.json();
            if(res.status===203){
                console.log(res.json());
                return window.location.reload();
            }
            else{
                console.log("Failed to delete content.")
            }
        }
        catch (e) {
            console.error(e);
        }
    }

    const submitContents = async (event) => {
        if (notes.contents === "") {
            return event.preventDefault();
        }
        try {
            let res = await fetch("/notes/new-note", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    title: notes.title,
                    contents: notes.contents
                })
            })

            await res.json();
            if (res.status === 200) {
                console.log("Data sent.")
            }
        } catch (e) {
            console.error(e);
        }
    }

    return <>
        <div className={"notesContainer"}>
            <form id={"newNotes"}>
                {contents==="no results found." ? (<h3 className={"pageNum"}>{contents}</h3>) : (<h3>1/{contents.length + 1}</h3>)}
                <h1>Notes</h1>
                <div className={"title"}>
                    <span>Title<sup className={"star"}>*</sup></span>
                </div>
                <input placeholder={"Title"} name={"title"} autoFocus={true} spellCheck={false} onChange={handleInput}/>
                <div className={"title"}>
                    <span>Contents<sup className={"star"}>*</sup></span>
                </div>
                <textarea placeholder={"test"} name={"contents"} autoFocus={true} spellCheck={false} maxLength={250}
                          onChange={handleInput}></textarea>
                {contents==="no results found." ? (<h3 className={"pageNum"}></h3>) : (
                    <><span className={"child1"}> <button type={"button"} onClick={forwardArrow} className={"forward-arrow-button"}>❯</button></span></>)}
                <div className={"buttonSubmit"} onClick={submitContents}>
                    <button>Post</button>
                </div>
            </form>

            {contents === "no results found." ? ( <></>) : (
                contents && contents.map((values, index) => {
                    return <div key={index} id={index + 1} className={"content-block"} style={{display: "none"}}>
                        <div className={"noteBlock"}>
                            <h3 className={"pageNum"}>{index + 2}/{contents.length + 1}</h3>
                        <button className={"backwards-arrow-button"} onClick={backwardsArrow}>❮</button>
                        <span className={"child1"}> <button type={"button"} onClick={forwardArrow}
                                                            className={"forward-arrow-button"}>❯</button></span>

                        <h3>{values.NoteName}</h3>
                        <p className={"notesContents"}>{values.NoteContents}</p>
                        <span className={"flex-icons"}>
                        <button className={"iconButton"} onClick={deleteNotes}><img src={require("../images/binImg.png")} alt={"bin"} className={"logo"}/></button>
                        <button className={"iconButton"}><img src={require("../images/pencil.png")} alt={"pencil icon."} className={"logo"} onClick={editButton}/></button>
                        </span>
                        </div>

                        <form className={"editNotes"}>

                            <h3>Title</h3>
                            <input id={"title"} name={"noteTitle"} onChange={handleInput}/>
                            <h3>Contents</h3>
                            <textarea id={"content"} name={"noteContent"} onChange={handleInput}/>
                            <br/>
                            <button onSubmit={test}>Change</button>
                        </form>
                    </div>
                }))}
        </div>
    </>
}
export {Notes};