import './App.css';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Support from './pages/Support';
import Account from './pages/Account';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import React, { createContext, useState} from 'react';

export const myAppContext = createContext()


function App() {
  const [reload, setReload] = useState(false)
  const [currentNOTE, setCurrentNOTE] = useState('')
  const [currentTITLE, setCurrentTITLE] = useState('')
  const [currentDESC, setCurrentDESC] = useState('')


 






  return (
    <>
     <myAppContext.Provider value={{reload, setReload, currentNOTE, setCurrentNOTE, currentTITLE, setCurrentTITLE, currentDESC, setCurrentDESC }}>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/support' element={<Support />} />
          <Route path='/account' element={<Account />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
 
      </myAppContext.Provider>

    </>

  );
}

export default App;
