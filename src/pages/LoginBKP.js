import React from 'react'
import { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [disableButton, setDisableButton] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isPwdVisible, setIsPwdVisible] = useState(false)
  const [pwdWarning, setPwdWarning] = useState(false)
  const [emailWarning, setEmailWarning] = useState(false)




  const navigate = useNavigate()

  const handleChange = (e) => {
    if (e.target.name == 'email') {
      setEmail(e.target.value)
    }
    if (e.target.name == 'password') {
      setPassword(e.target.value)
    }
  }

  const togglePwdVisibility = () => {

    setIsPwdVisible(prev => !prev)
    console.log(isPwdVisible)
  }

  useEffect(() => {
    const auth_token = localStorage.getItem('auth_token')
    if (auth_token !== null)
      navigate('/account')
  }, [])


  useEffect(() => {
    if (password.length == 0 || email.length == 0) {
      setDisableButton(true)
    }
    else {
      setDisableButton(false)
    }

  }, [password, email])



  const submitLogin = async (e) => {
    e.preventDefault()
    setIsSubmitted(true)
    const response = await fetch('http://localhost:5000/users/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) })
    const data = await response.json()

    if (data.errorUSER) {
      setEmailWarning(true)
      setPwdWarning(false)
    }

    if (data.errorPWD) {
      setPwdWarning(true)
      setEmailWarning(false)
    }


    if (data.auth_token) {
      localStorage.setItem('auth_token', JSON.stringify(data.auth_token));
      navigate("/account")
    }




    console.log(data)
  }


  return (
    <div style={{ backgroundColor: 'rgba(98, 0, 238, 0.8)', borderRadius: '15px', width: '500px', color: 'white' }} className='container mt-5 px-5 py-5'>
      <form onSubmit={submitLogin}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input style={{ height: '30px' }} type="email" name='email' value={email} onChange={handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input style={{ height: '30px' }} type={isPwdVisible ? "text" : "password"} name='password' value={password} onChange={handleChange} className="form-control" id="exampleInputPassword1" />
        </div>
        <div className="mb-3 form-check">
          <input onChange={togglePwdVisibility} checked={isPwdVisible} type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">Show password</label>
        </div>
        <div style={{ display: emailWarning ? 'block' : 'none', backgroundColor: 'rgba(255,0,0,0.9)', color: 'white', fontSize: '13px', width: '180px' }} className="mb-3 text-center rounded-5 py-2 mx-auto">
          Email is not registered.
        </div>
        <div style={{ display: pwdWarning ? 'block' : 'none', backgroundColor: 'rgba(255,0,0,0.9)', color: 'white', fontSize: '13px', width: '180px' }} className="mb-3 text-center rounded-5 py-2 mx-auto">
          Incorrect Password.
        </div>
        <div className='text-center'>
          <button disabled={disableButton} type="submit" className="btn btn-primary">Login</button>
        </div>
      </form>

    </div>
  )
}

export default Login
