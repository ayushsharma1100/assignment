import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Signup(props) {
  let navigate = useNavigate();
  let handleSubmit = async(e)=>{
    e.preventDefault();
    let password = document.getElementById("registerPassword").value;
    let cPassword = document.getElementById("cRegisterPassword").value;
    if(password!==cPassword){
      document.getElementById("confirmPassword").innerHTML = "Password didn't matched";
      return;
    }
    let email = document.getElementById("registerEmail").value;
    let name = document.getElementById("registerName").value;
    let response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({name, email, password})
      })
    response = await response.json();
    if(response.success){
        localStorage.setItem("inotebookToken", response.authToken);
        props.showAlert("User registered successfully", "success");
        navigate("/");
    }
    else{
      props.showAlert("Invalid credentials", "danger");
    }
  }
  return (
    <div className="container-fluid" style={{width: "30%", marginTop: "80px"}}>
      <h3 style={{textAlign: 'Center'}}>SignUp</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="exampleInputEmail1">Name</label>
            <input type="text" className="form-control" id="registerName" aria-describedby="nameHelp" placeholder="Enter full name" />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control" id="registerEmail" aria-describedby="emailHelp" placeholder="Enter email" />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" className="form-control" id="registerPassword" placeholder="Password" />
          <p id='confirmPassword'></p>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Confirm Password</label>
          <input type="password" className="form-control" id="cRegisterPassword" placeholder="Confirm Password" />
        </div>
        <button type="submit" className="btn btn-primary my-2">Submit</button>
      </form>
    </div>
  )
}
