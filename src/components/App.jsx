import React, { useState } from "react"
import Header from "./Header"
import Footer from "./Footer"
import Note from "./Note"
import CreateArea from "./CreateArea"
import axios from "axios"
import { v4 as uuidv4 } from "uuid"
import CircularProgress from '@mui/material/CircularProgress';

function App() {
  const [notes, setNotes] = useState([])
  const [apiResponse, setApiResponse] = useState("")

  function addNote(newNote) {
    newNote.noteId = uuidv4()
    setApiResponse(<CircularProgress />)
    axios({
      method: 'post',
      url: 'https://github-nodejs-notes-api.onrender.com/',
      data: newNote
    })
    .then(function (response, error) {
      if (!response.status === 200) console.log(error)
      else {
        setApiResponse("")
        setNotes(prevNotes => {
          return [...prevNotes, newNote]
        })
      }
    })
  }

  function deleteNote(noteId) {
    axios({
      method: 'post',
      url: 'https://github-nodejs-notes-api.onrender.com/delete',
      data: noteId
    })
    .then(function (response, error) {
      if (!response.status === 200) console.log(error)
      else {
        setNotes(prevNotes => {
          return prevNotes.filter((noteItem) => {
            return noteItem.noteId !== noteId;
          })
        })
      }
    })
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote}/>
      <p>{apiResponse}</p>
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            noteId={noteItem.noteId}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        )
      })}
      <Footer />
    </div>
  )
}

export default App
