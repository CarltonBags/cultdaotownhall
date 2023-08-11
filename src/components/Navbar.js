import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, Link } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import "./Navbar.css";





function Navbar ({handleBrandClick, handleLoginClick, handleRegisterClick}) {

const navigate= useNavigate();
const [user, setUser] = useState(null);
const auth = getAuth();

const handleButtonClick = () => {
    navigate("/");
}

/*const handleClick = () => {
    handleLoginClick();
    navigate("/login");
 }

 const handleRClick = () => {
    handleRegisterClick();
    navigate("/register");
 }*/

 useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();  // Clean-up function to avoid memory leaks
  }, [auth]);

  const handleLogout = () => {
    signOut(auth).catch((error) => console.error("Error signing out", error));
  };


  return (
    <nav className="navbar navbar-expand-lg nav-style">
      <a onClick={handleButtonClick} className="navbar-brand navbar-image" href={"/"}>
        <img src="/townhall1.png" alt="img" width="auto" height="80" />
      </a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link dune" href="https://cultdao.io/manifesto.pdf">Docs</a>
          </li>
          <li className="nav-item">
            <a className="nav-link dune" href="https://dune.com/cultdaoio/cult-dao">Stats</a>
          </li>
          <li className="nav-item">
            {user ? (
              <button onClick={handleLogout} type="button" className="btn btn-danger logout-button mr-sm-2">Logout</button>
            ) : (
              <>
                <Link to="/login" className="btn btn-dark login-button">Login</Link>
                <Link to="/register" className="btn btn-danger signup-button">Sign up</Link>
              </>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}




export default Navbar;