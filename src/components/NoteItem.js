import React, { useState, useContext, createContext, useEffect, useRef } from 'react'
import editIcon from '../assets/edit.svg'
import deleteIcon from '../assets/delete.svg'
import { myAppContext } from '../App'
import EditNote from './EditNote'

export const UpdateContext = createContext()


const NoteItem = (props) => {
  const { updateNote } = props
  const [title, setTitle] = useState('')

  const [desc, setDesc] = useState('')

  const [tWarn, setTWarn] = useState()
  const [dWarn, setDWarn] = useState()
  const [canAdd, setCanAdd] = useState(false)

  const { reload, setReload, currentNOTE, setCurrentNOTE, currentTITLE, setCurrentTITLE, currentDESC, setCurrentDESC } = useContext(myAppContext)
  const submitNclose = document.getElementById('submitNclose')
  const editNoteButton = document.getElementById('staticBackdropEdit')
  const ref = useRef()



  const [currentNoteID, setCurrentNoteID] = useState(props.id)



  // const setNoteID = () => {
  //   setCurrentNoteID(props.id)
  // }





  const auth_token = localStorage.getItem('auth_token')

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

  const deleteNote = async () => {
    const response = await fetch(`http://localhost:5000/notes/delete/${props.id}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json', 'authorization': `BEARER ${auth_token}` } })
    const data = await response.json()
    console.log(data)
    setReload((prev) => { return !prev })
  }

  const clickEdit = async (e) => {
    // console.log(props.id)
    // console.log(props.title)
    // console.log(props.desc)


    // console.log(props.title)
    // console.log(props.desc)
    // console.log(currentTITLE)
    // console.log(currentDESC)

    await setCurrentTITLE(props.title)
    await setCurrentDESC(props.desc)
    await setCurrentNOTE(props.id)

    updateNote(currentTITLE, currentDESC)


    console.log(props.id)
    console.log(currentNOTE)



  }

  const my = (e) => {
    e.preventDefault()
    console.log('sub props', props.id)
    console.log('sub curr', currentNoteID)
    // console.log('subr', noteID)



  }





  const submitEditedNote = async (e) => {
    e.preventDefault()
    const response = await fetch(`http://localhost:5000/notes/edit/${props.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', 'authorization': `BEARER ${auth_token}` }, body: JSON.stringify({ title: title, desc: desc }) })
    const data = await response.json()
    console.log('DELETED', props.id)
    console.log('DELETED', currentNoteID)

    setReload(true)
    setTitle('')
    setDesc('')
    setTimeout(() => {
      submitNclose.click()

    }, 1);
  }



  return (
    <>
      <myAppContext.Provider value={{}}>

      </myAppContext.Provider>
      <div style={{ paddingTop: '10px', marginBottom: '20px' }} className="">

        <div className="card text-white bg-primary mb-3" style={{ margin: '0px auto', maxWidth: '550px' }}>
          <div style={{ justifyContent: 'space-between' }} className="card-header d-flex">

            <div style={{ marginLeft: '20px' }} className="noteheader">{props.date}</div>
            <img onClick={deleteNote} style={{ cursor: 'pointer', filter: "invert(100%)" }} src={deleteIcon} alt="" width="20px" />
            <img onClick={clickEdit} style={{ cursor: 'pointer', filter: "invert(100%)" }} src={editIcon} alt="" width="20px" />
          </div>
          <div className="card-body">
            <h5 className="card-title">{props.title}</h5>
            <p className="card-text">{props.desc}</p>
          </div>
        </div>
      </div>

      {/* EDITING MODAL START */}


    </>
  )
}

export default NoteItem
