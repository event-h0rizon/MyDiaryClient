import React, { useEffect, useState, createContext } from 'react'
import AddNote from '../components/AddNote'
import NoteItem from '../components/NoteItem'

const Account = () => {

  const [fetchedNotes, setfetchedNotes] = useState([])
  const fetchedNotesContext = createContext()

  const [renderTrigger, setrenderTrigger] = useState(false)
  const fetchNotes = async () => {
    try {
      const response = await fetch('http://localhost:5000/notes/', { method: 'POST', headers: { 'Content-Type': 'application/json', 'authorization': 'BEARER eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiS2FydGhpayIsImVtYWlsIjoibm93QG5vdy5jb20iLCJpZCI6IjY1MWZhY2JlNDZlYTA3MjAzZmY0ZmU4NyIsImlhdCI6MTY5NjU3NDY1NH0.HhfS_CTmKpb9Sm-4B9m4jujnq5XrHGS-NC8Kro2uDG4' } })
      const data = await response.json()

      console.log(data)
      setfetchedNotes(data)
      // console.log(fetchedNotes[0].title)

    } catch (error) {
      console.log(error)
    }


  }

  useEffect(() => {



    console.log('I am running...........')
    fetchNotes()


  }, [])


  return (
    <>
      {/* <fetchedNotesContext.Provider value={fetchedNotes}> */}
        <AddNote />
        {/* <NoteItem /> */}
        {fetchedNotes && fetchedNotes.map((note,index)=>{ return(<NoteItem key={note._id} title={note.title} desc={note.desc} date={note.date} deleteindex={index} id={note._id} />)
        

      })}
      {/* </fetchedNotesContext.Provider> */}

    


    </>
  )
}

export default Account
