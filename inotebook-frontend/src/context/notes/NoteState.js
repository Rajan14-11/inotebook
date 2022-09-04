import React, { useState } from "react";
import NoteContext from "./noteContext";
import axios from "../../axios"

const NoteState = (props) => {
  const [notes, setNotes] = useState([]);

  const getNotes = async()=>{
    const response = await axios.get(`/api/notes/fetchallnotes`, {
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
  })
    const json =await response.data
    setNotes(json)
  }

  const addNote = async (title, description, tag) => {
    console.log("Adding a new note",title,description,tag);

    const response = await axios.post(`/api/notes/addnote`,{title,description,tag}, {
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      },
    });

    const note = response.data
    setNotes(notes.concat(note))
  };

  const deleteNote =async (id) => {
   await axios.delete(`/api/notes/deletenote/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
    });
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  const editNote = async (id, title, description, tag) => {
    await axios.put(
      `/api/notes/updatenote/${id}`,
      { title, description, tag },
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            localStorage.getItem('token'),
        },
      }
    );

    // const element = notesState.filter((note) => note._id === id);
    // console.log(element);

    // if (element) {
    //   element.title = title;
    //   element.description = description;
    //   element.tag = tag;
    // }

    // let newNotes = notesState.filter((note) => note._id !== id);

    // setNotes([...newNotes , ...element])

     let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote,getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
