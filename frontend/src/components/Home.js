import React, { useEffect } from 'react'
import AddNote from './AddNote'
import Notes from './Notes'
import { useNavigate } from 'react-router-dom'

export default function Home(props) {
  let navigate = useNavigate();
  let token = localStorage.getItem('inotebookToken');
  useEffect(() => {
    if(!token){
      navigate("login");
    }
    // eslint-disable-next-line
  }, [])
  
  return (
    <>
        {token && <div className="content">
        <AddNote showAlert={props.showAlert} />
        <Notes showAlert={props.showAlert} />
        </div>}
    </>
  )
}
