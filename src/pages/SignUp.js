import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cpassword, setcPassword] = useState('')

  const [name, setName] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [disableButton, setDisableButton] = useState(true)
  const [pwdWarning, setPwdWarning] = useState(false)
  const [dupUserWarning, setDupUserWarning] = useState(false)

  const [isPwdVisible, setIsPwdVisible] = useState(false)


  const navigate= useNavigate()


  const handleChange = (e) => {
    if (e.target.name === 'name') {
      setName(e.target.value)
    }
    if (e.target.name === 'email') {
      setEmail(e.target.value)
    }
    if (e.target.name === 'password') {
      setPassword(e.target.value)
    }
    if (e.target.name === 'cpassword') {
      setcPassword(e.target.value)
    }

  }

  useEffect(() => {
    if (password.length == 0 || cpassword.length == 0 || name.length == 0 || email.length == 0) {
      setDisableButton(true)
      setPwdWarning(false)

    }
    else {
      if (password === cpassword) {
        setDisableButton(false)
        setPwdWarning(false)
      }
      else {
        setDisableButton(true)
        setPwdWarning(true)

      }
    }

  }, [name, email, password, cpassword])



  // WORKING
  // useEffect(() => {
  //   if (password.length == 0 || cpassword.length == 0) {
  //     setDisableButton(true)
  //   }
  //   else {
  //     if (password === cpassword) {
  //       setDisableButton(false)
  //     }
  //     else {
  //       setDisableButton(true)
  //     }
  //   }

  // }, [password, cpassword])

  const togglePwdVisibility=()=> {

    setIsPwdVisible(prev => !prev)
    // console.log(isPwdVisible)
  }



  const submitSignUp = async (e) => {
    e.preventDefault()
    setIsSubmitted(true)
    const response = await fetch('http://localhost:5000/users/signup', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, password }) })
    const data = await response.json()
    console.log(data)
    if(!data.name){
      localStorage.setItem('auth_token', data);
      navigate("/account")
    }
    else{
      setDupUserWarning(true)
    }
   
    

    // console.log(data)
  }


  return (
    <div style={{ backgroundColor: 'rgba(98, 0, 238, 0.8)', borderRadius: '15px', width: '500px', color: 'white' }} className='container mt-2 px-5 py-5'>
      <form onSubmit={submitSignUp}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input style={{ height: '30px' }} type="text" value={name} name='name' onChange={handleChange} className="form-control" id="name" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input style={{ height: '30px' }} type="email" value={email} name='email' onChange={handleChange} className="form-control" id="email" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input style={{ height: '30px' }} type={isPwdVisible ? "text" : "password"} value={password} name='password' onChange={handleChange} className="form-control" id="exampleInputPassword1" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputcPassword1" className="form-label">Confirm Password</label>
          <input style={{ height: '30px' }} type={isPwdVisible ? "text" : "password"} value={cpassword} name='cpassword' onChange={handleChange} className="form-control" id="exampleInputcPassword1" />
        </div>
        <div className="mb-3 form-check">
          <input onChange={togglePwdVisibility} checked={isPwdVisible} type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">Show password</label>
        </div>
        <div style={{ display: pwdWarning? 'block' : 'none', backgroundColor: 'rgba(255,0,0,0.9)', color: 'white', fontSize: '13px', width: '180px' }} className="mb-3 text-center rounded-5 py-2 mx-auto">
          Passwords don't match.
        </div>
        <div style={{ display: dupUserWarning? 'block' : 'none', backgroundColor: 'rgba(255,0,0,0.9)', color: 'white', fontSize: '13px', width: '180px' }} className="mb-3 text-center rounded-5 py-2 mx-auto">
          Email already registered.
        </div>
        <div className='text-center'>
          <button disabled={disableButton} className="btn btn-primary">Sign Up</button>
        </div>

      </form>

    </div>
  )
}

export default SignUp
