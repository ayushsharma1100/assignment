import React, { useContext, useEffect, useState } from 'react'
import noteContext from '../context/noteContext'
import NoteItem from './NoteItem';

export default function Notes(props) {
  let { notes, fetchNotes, updateNote } = useContext(noteContext);
  let [id, setId] = useState(null);
  useEffect(() => {
    console.log("triggered");
    fetchNotes();}
    // eslint-disable-next-line
  , [])

  async function handleUpdate(){
    let title = document.getElementById("edTitle").value
    let description = document.getElementById("edDescription").value
    let tag = document.getElementById("edTag").value
    await updateNote(id, title, description, tag);
    props.showAlert("Note updated successfully", "success")
    document.getElementById("closeModal").click();
  }

  return (
    <div className="container">
      <button type="button" className="btn btn-primary" id='toggleModal' style={{display: "none"}} data-bs-toggle="modal" data-bs-target="#editModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editModalLabel">Edit Post</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <form>
                <div className="form-group my-1">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" id="edTitle" aria-describedby="titleHelp" placeholder="Enter Title" />
                </div>
                <div className="form-group my-1">
                    <label htmlFor="description">Description</label>
                    <input type="text" className="form-control" id="edDescription" placeholder="Description" />
                </div>
                <div className="form-group my-1">
                    <label htmlFor="tag">Tag</label>
                    <input type="text" className="form-control" id="edTag" placeholder="Tag" />
                </div>
            </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" id='closeModal'>Close</button>
              <button type="button" className="btn btn-primary" id='updateNote' onClick={()=>{handleUpdate()}}>Update Note</button>
            </div>
          </div>
        </div>
      </div>

      <h2 style={{textAlign: 'center'}}>Posts</h2>
      <div className="row">
        {notes.map((note) => {
          return (
            <div key={note._id} className="col-md-12 my-2">
              <div className="container-fluid" style={{width: "60%"}}>
              <NoteItem title={note.title} description={note.description} id={note._id} tag={note.tag} setId={setId} showAlert={props.showAlert} userName={note.userName} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}
