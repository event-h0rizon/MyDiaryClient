import React, { useEffect, useState, createContext, useContext, useRef } from 'react'
import AddNote from '../components/AddNote'
import NoteItem from '../components/NoteItem'
import { myAppContext } from '../App'
import { UpdateContext } from '../components/NoteItem'

// export const EditContext = createContext()

const Account = () => {
  const [trigger, settrigger] = useState()
  const auth_token = localStorage.getItem('auth_token')
  let currentNote

  const [refresh, setRefresh] = useState(false)
  


  const [fetchedNotes, setfetchedNotes] = useState([])
  const fetchedNotesContext = createContext()

  const { reload, setReload, currentNOTE, setCurrentNOTE, currentTITLE, setCurrentTITLE, currentDESC, setCurrentDESC } = useContext(myAppContext)


  const [renderTrigger, setrenderTrigger] = useState(false)
  const [title, setTitle] = useState(currentTITLE)
  const [desc, setDesc] = useState(currentDESC)




  const [tWarn, setTWarn] = useState()
  const [dWarn, setDWarn] = useState()
  const [canAdd, setCanAdd] = useState(false)



  const ref = useRef(null)
  const refClose = useRef(null)


  const fetchNotes = async () => {
    try {
      const auth_token = localStorage.getItem('auth_token')
      const response = await fetch('http://localhost:5000/notes/', { method: 'POST', headers: { 'Content-Type': 'application/json', 'authorization': `BEARER ${auth_token}` } })
      const data = await response.json()

      console.log(data)
      setfetchedNotes(data)
      // console.log(fetchedNotes[0].title)

    } catch (error) {
      console.log(error)
    }


  }

  useEffect(() => {

    try {
      console.log('I am running...........')
      fetchNotes()


    } catch (error) {
      console.log(error)

    }
    return () => {
      setReload(false)
    }


  }, [reload])



  useEffect(() => {
    if (title !== null) {
      setTWarn(true)
    }
    setTWarn(false)
  }, [title, desc])

  useEffect(() => {
    if (desc !== null) {
      setDWarn(true)
    }
    setDWarn(false)

  }, [desc, title])


  useEffect(() => {
    if (title.length == 0 || desc.length == 0) {
      setCanAdd(false)
    }
    else {
      setCanAdd(true)
    }

  }, [title, desc])

  useEffect(() => {
    if (title.length == 0) {
      // setCanAdd(false)
      setTWarn(true)
    }
  }, [title, desc])

  useEffect(() => {
    if (desc.length == 0) {
      // setCanAdd(false)
      setDWarn(true)
    }
  }, [desc, title])


  const handleChange = (e) => {


    if (e.target.name == 'title') {
      setTitle(e.target.value)
    }
    if (e.target.name == 'desc') {
      setDesc(e.target.value)
    }
  }




  const updateNote = (currentTITLE, currentDESC) => {
    // currentNote= note

    // setTitle(currentTITLE)
    // setDesc(currentDESC)
    ref.current.click()
    setRefresh(prev=> !prev)

  

  }


  useEffect(() => {
    setTitle(currentTITLE)
    setDesc(currentDESC)





  }, [refresh])
  const submitUpdatedNote = async (e) => {
    e.preventDefault()
    const response = await fetch(`http://localhost:5000/notes/edit/${currentNOTE}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', 'authorization': `BEARER ${auth_token}` }, body: JSON.stringify({ title, desc }) })
    const data = await response.json()
    console.log(currentNOTE)

    setTitle('')
    setDesc('')
    setTimeout(() => {
      refClose.current.click()

    }, 1);
    setReload(prev => !prev)


  }


  return (
    <>
      {/* <fetchedNotesContext.Provider value={fetchedNotes}> */}

      <AddNote />

      {/* <NoteItem /> */}

      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#staticBackdropEdit">
        Edit Note Panel
      </button>

      <div className="modal fade" id="staticBackdropEdit" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 text-black" id="staticBackdropLabel">Edit Note</h1>
              <button ref={refClose} type="button" id="submitNclose" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form >
                <div className="mb-3">
                  <label htmlFor="title" className="form-label text-black">Title</label>
                  <input type="text" name='title' value={title} onChange={handleChange} className="form-control" id="title" />

                </div>
                <div className="mb-3">
                  <label htmlFor="desc" className="form-label text-black">Description</label>
                  <input type="text" name='desc' value={desc} onChange={handleChange} className="form-control" id="desc" />
                </div>
                <div style={{ color: 'red', display: tWarn ? 'block' : 'none', fontSize: '15px', textAlign: 'center' }} className="mb-3">Title can't be empty.</div>
                <div style={{ color: 'red', display: dWarn ? 'block' : 'none', fontSize: '15px', textAlign: 'center' }} className="mb-3">Add some description</div>

                <button onClick={submitUpdatedNote} disabled={!canAdd} type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>

          </div>
        </div>
      </div>


      {fetchedNotes && fetchedNotes.map((note, index, fetchedNotes) => {
        return (<NoteItem key={note._id} title={note.title} desc={note.desc} date={note.date} deleteindex={index} id={note._id} updateNote={updateNote} />)


      })}
      {/* </fetchedNotesContext.Provider> */}




    </>
  )
}

export default Account
