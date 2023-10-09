import React from 'react'
import { Link } from 'react-router-dom'
import ui from '../assets/ui.png'
import notedata from '../assets/userdata.png'
import userdata from '../assets/notedata.png'



const About = () => {
  return (
    <>
    <div className="container my-2">
      <h3>About us</h3>
      <p>MyDiary is a simple, secure & anonymous document storage application. All your data is <strong>encrypted end-to-end</strong>. That means nobody can access your data apart from you. And the fact your data is <strong>anonymous</strong> means, it is not possible to identify you using the data stored in our database.</p>
    <h5>Head over to the home page, to get started.</h5>
    <p style={{marginTop:'300px'}}>Developed by <strong>Karthik P</strong></p>

    </div>
    </>
  )
}

export default About
