import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login(props) {
    let navigate = useNavigate()
    const handleSubmit = async(e)=>{
        e.preventDefault();
        let email = document.getElementById("loginEmail").value;
        let password = document.getElementById("loginPassword").value;
        let response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password})
          })
        response = await response.json();
        if(response.success){
            localStorage.setItem("inotebookToken", response.authToken);
            props.showAlert("Successfully logged in", "primary")
            navigate("/");
        }
        else{
            props.showAlert("Invalid credentials", "danger");
        }
    }
    return (
        <div className="container my-2" style={{width: "25%", paddingTop: "80px"}}>
            <h3 style={{textAlign: 'center'}}>SignIn</h3>
            <form onSubmit={handleSubmit}>
            <div className="form-group my-2">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" id="loginEmail" aria-describedby="emailHelp" placeholder="Enter email" required />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" id="loginPassword" placeholder="Password" required minLength={5}/>
            </div>
            <button type="submit" className="btn btn-primary my-2">Submit</button>
        </form>
        </div>
    )
}
