import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';
import NavBar from './components/NavBar';
import About from './components/About';
import Profile from './components/Profile';
import NoteState from './context/noteState';
import Home from './components/Home';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup'
import { useState } from 'react'

function App() {
  const [alert, setAlert] = useState(null);
  let showAlert = (msg, type)=>{
    setAlert({message: msg, type});
    setTimeout(()=>{
      setAlert(null);
    }, 2000)
  }

  return(
    <NoteState>
    <Router>
      <NavBar />
    <Alert alert={alert} />
    <Routes>
      <Route path='/' element={<Home showAlert={showAlert} />} />
      <Route path='/about' element={<About about="About" showAlert={showAlert} />} />
      <Route path='/profile' element={<Profile showAlert={showAlert} />} />
      <Route path='/login' element={<Login showAlert={showAlert} />} />
      <Route path='/signup' element={<Signup showAlert={showAlert} />} />
    </Routes>
  </Router>
  </NoteState>
  );
}

export default App;
