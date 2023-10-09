import React, { useState } from 'react'
import logo from '../assets/logo.png'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const auth_token = localStorage.getItem('auth_token')
    // console.log(auth_token)
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem('auth_token')
        navigate("/")
    }


    return (
        <nav style={{ position: 'sticky', top: '0px', width: '100%', zIndex: '10' }} className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid " >
                <Link className="navbar-brand" to="/">MyDiary</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">About Us</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/support">Support</Link>
                        </li>

                    </ul>
                    <div className="d-flex">
                        
                        {auth_token && <Link to='/account'>
                            <img className='profile mx-2' src={logo} alt="Error" />
                        </Link>}
                        {auth_token && <Link to='/account'>
                            <button className="btn btn-outline-success mx-2" >My Account</button>
                        </Link>}
                        {auth_token && <Link to="/" >
                            <button onClick={logout} className="btn btn-outline-success mx-2" >Logout</button>
                        </Link>}
                        {!auth_token && <Link to="/login" >
                            <button className="btn btn-outline-success mx-2" >Login</button>
                        </Link>}
                        {!auth_token && <Link to="/signup" >
                            <button className="btn btn-outline-success mx-2" >Sign Up</button>
                        </Link>}

                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
