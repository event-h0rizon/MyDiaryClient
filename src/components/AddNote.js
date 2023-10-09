import React, { useState, useEffect, useContext, useRef } from 'react'
import { Link } from 'react-router-dom'
import { myAppContext } from '../App'

const AddNote = () => {
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')

    const [tWarn, setTWarn] = useState()
    const [dWarn, setDWarn] = useState()
    const [canAdd, setCanAdd] = useState(false)



    const { reload, setReload } = useContext(myAppContext)

    const myRef = useRef()

    const handleChange = (e) => {
        if (e.target.name == 'title') {
            setTitle(e.target.value)
        }
        if (e.target.name == 'desc') {
            setDesc(e.target.value)
        }
    }

    const submitNclose = document.getElementById('submitNclose')

    const submitNote = async (e) => {
        const auth_token = localStorage.getItem('auth_token')
        e.preventDefault()
        // setIsSubmitted(true)
        const response = await fetch('http://localhost:5000/notes/create', { method: 'POST', headers: { 'Content-Type': 'application/json', 'authorization': `BEARER ${auth_token}` }, body: JSON.stringify({ title, desc }) })
        const data = await response.json()
        setReload(true)
        setTitle('')
        setDesc('')
        setTimeout(() => {
            submitNclose.click()

        }, 1);

    }

    useEffect(() => {
        if (title !== null) {
            setTWarn(true)
        }
        setTWarn(false)

    }, [title,desc])

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



    return (
        <>
            <button style={{ marginLeft: '25px', borderRadius: '12px' }} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Add note
            </button>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Add Note</h1>
                            <button type="button" id="submitNclose" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={submitNote}>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" name='title' value={title} onChange={handleChange} className="form-control" id="title" />
                                    {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="desc" className="form-label">Description</label>
                                    <input type="text" name='desc' value={desc} onChange={handleChange} className="form-control" id="desc" />
                                </div>
                                <div style={{ color: 'red', display: tWarn ? 'block' : 'none', fontSize: '15px', textAlign: 'center' }} className="mb-3">Title can't be empty.</div>
                                <div style={{ color: 'red', display: dWarn ? 'block' : 'none', fontSize: '15px', textAlign: 'center' }}className="mb-3">Add some description</div>

                                <button disabled={!canAdd} type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                        {/* <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Understood</button>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddNote
