import React, { useContext } from 'react'
import noteContext from '../context/noteContext'

export default function AddNote(props) {
    let {addNote} = useContext(noteContext);


    const handleSubmit = async ()=>{
        let title = document.getElementById("title").value;
        let description = document.getElementById("description").value;
        let tag = document.getElementById("tag").value;
        await addNote(title, description, tag);
        props.showAlert("Added note successfully", "success")
        document.getElementById("title").value = "";
        document.getElementById("description").value = "";
        document.getElementById("tag").value = "";
        document.getElementById("titleInfo").innerText = "";
        document.getElementById("descriptionInfo").innerText = "";
    }
    
    function addValidation(){
        if(document.getElementById("title").value.length <4 && document.getElementById("description").value.length<5){
            document.getElementById("titleInfo").innerText = "Title must be atleast 4 characters.";
            document.getElementById("descriptionInfo").innerText = "Description must be atleast 5 characters.";
            return false;
        }
        else if(document.getElementById("title").value.length <4) {
            document.getElementById("titleInfo").innerText = "Title must be atleast 4 characters.";
            return false;
        }
        else if(document.getElementById("description").value.length<5) {
            document.getElementById("descriptionInfo").innerText = "Description must be atleast 5 characters.";
            return false;
        }
        else return true;
    }

    return (
        <div className="container" style={{marginTop: "3rem", width: "40%"}}>
            <h1 style={{textAlign: "center"}}>New Post</h1>
            <form>
                <div className="form-group my-1">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" id="title" aria-describedby="titleHelp" placeholder="Enter Title" />
                    <p id='titleInfo' className='validationInfo'></p>
                </div>
                <div className="form-group my-1">
                    <label htmlFor="description">Description</label>
                    <input type="text" className="form-control" id="description" placeholder="Description" />
                    <p id='descriptionInfo' className='validationInfo'></p>
                </div>
                <div className="form-group my-1">
                    <label htmlFor="tag">Tag</label>
                    <input type="text" className="form-control" id="tag" placeholder="Tag" />
                </div>
                <button type="submit" className="btn btn-primary my-2" onClick={(e)=>{e.preventDefault();if(addValidation()) {handleSubmit();}}} id='addValidation'>Add Note</button>
            </form>
        </div>
    )
}
