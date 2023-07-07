import React from 'react';
import { Link, useLocation, useNavigate} from 'react-router-dom';

function NavBar() {
    let location = useLocation();
    let navigate = useNavigate();
    return (
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark sticky-top">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Sample App</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-2 mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/"?'active':''}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about"?'active':''}`} to="/about">About Us</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/profile"?'active':''}`} to="/profile">Profile</Link>
                        </li>
                    </ul>
                    {!localStorage.getItem("inotebookToken") ? <div className="d-flex ms-auto">
                        <Link to="/login" className="btn btn-primary mx-1" role="button" aria-pressed="true">Login</Link>
                        <Link to="/signup" className="btn btn-primary mx-1" role="button" aria-pressed="true">Sign Up</Link>
                    </div>:<button className='btn btn-primary ms-auto' onClick={()=>{localStorage.removeItem("inotebookToken"); navigate("/login")}}>Logout</button>}
                </div>
            </div>
        </nav>
    )
}

export default NavBar
