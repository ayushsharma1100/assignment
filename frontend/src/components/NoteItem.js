import React, { useContext } from 'react'
import noteContext from '../context/noteContext'

export default function NoteItem(props) {
    let {deleteNote} = useContext(noteContext);
    function handleEdit(){
        let title = props.title;
        let description = props.description;
        let tag = props.tag;
        document.getElementById("toggleModal").click();
        document.getElementById("edTitle").value = title;
        document.getElementById("edDescription").value = description;
        document.getElementById("edTag").value = tag;
        props.setId(props.id);
    }
    
    return (
        <div className="card">
            <div className="card-header">
                User: {props.userName}
            </div>
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <p className="card-text">{props.description}</p>
                <i className="fa-solid fa-trash fa-lg" style={{color: "red"}} onClick={async()=>{await deleteNote(props.id); props.showAlert("Note deleted successfully", "success")}}></i>
                <i className="fa-solid fa-pen-to-square mx-3 fa-lg" onClick={()=>{handleEdit()}}></i>
            </div>
        </div>
    )
}
