import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props)=>{
    let host = "http://localhost:5000"
    let initialNotes = []
    const [notes, setNotes] = useState(initialNotes);

    const addNote = async(title, description, tag)=>{
      let content = {
        title, description, tag
      }
      let response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem("inotebookToken"),
          "Content-Type": "application/json"
        },
        body: JSON.stringify(content)
      })
      let note = await response.json()
      // const note = {
      //       "_id": "64671a16419z639f5b660edb2cc",
      //       "user": "6461e2e8ab262ac544315b89a",
      //       "title": title,
      //       "description": description,
      //       "tag": tag,
      //       "date": "2023-05-19T06:04:20.431Z",
      //       "__v": 0
      //     }
      setNotes(notes.concat(note));
    }

    const fetchNotes = async()=>{
      let response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("inotebookToken")
        }
      })
      let res = await response.json()
      setNotes(res.notes);
    }

    const updateNote = async (id, title, description, tag)=>{
      let body = {
        title, description, tag
      }
      await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "auth-token": localStorage.getItem("inotebookToken"),
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      })
      let updatedNotes = JSON.parse(JSON.stringify(notes));
      for (let index = 0; index < updatedNotes.length; index++) {
        if(updatedNotes[index]._id === id){
          updatedNotes[index].title = title;
          updatedNotes[index].description = description;
          updatedNotes[index].tag = tag;
          break;
        }
      }
      setNotes(updatedNotes);      
    }

    const deleteNote = async(id)=>{
      await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "auth-token": localStorage.getItem("inotebookToken")
        }
      })

      let updatedNotes = notes.filter((note)=>{return note._id!==id});
      setNotes(updatedNotes);
    }

    return (
        <noteContext.Provider value={{notes, addNote, deleteNote, updateNote, fetchNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;