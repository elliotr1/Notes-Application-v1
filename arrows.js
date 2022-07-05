let indexOfNote = 3;
const backwardsArrow = () =>{
    let n = document.getElementsByClassName("notesContainer").item(0).getElementsByTagName("div");
    indexOfNote -= 2;
    if (indexOfNote >= 5) {
        n.item(indexOfNote-2).style.display = "inline-block";
        n.item(indexOfNote).style.display = "none";
    }
    else{
        document.querySelectorAll(".forward-arrow-button").forEach(element => {
            element.style.display = "inline-block";
        })
        n.item(indexOfNote).style.display = "none";
        document.getElementById("newNotes").style.display = "inline-block"
        console.log(n.item(1).style.display = "block");
    }
}

const forwardArrow = () => {
    let notes = document.getElementsByClassName("notesContainer").item(0).getElementsByTagName("div");
    if (indexOfNote >= 3) {
        document.getElementById("title").value = notes.item(indexOfNote).getElementsByTagName("h3").item(1).innerText;
        document.getElementById("content").value = notes.item(indexOfNote).getElementsByTagName("p").item(0).innerText;
        document.getElementById("newNotes").style.display = "none";
        notes.item(indexOfNote).style.display = "inline-block"
    }
    notes.item(indexOfNote - 2).style.display = "none"
    notes.item(indexOfNote).style.display = "inline-block"
    if (indexOfNote === notes.length - 2) {

        document.querySelectorAll(".forward-arrow-button").forEach(element => {
            element.style.display = "none";
        })
    }
    return indexOfNote += 2;
}

const editButton = () => {
    document.getElementsByClassName("content-block").item(0).getElementsByTagName("form").item(0).style.display = "inline-block";
    document.getElementsByClassName("content-block").item(0).getElementsByTagName("div").item(0).style.display = "none";
}

const timeConvert = (t) => {
    return new Date(t).toLocaleDateString();
}

export {backwardsArrow, forwardArrow, timeConvert, indexOfNote, editButton}