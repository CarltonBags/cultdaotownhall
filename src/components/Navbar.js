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
    <nav className="navbar bg-body-primary">
      <div className="container-fluid">
          <a onClick= {handleButtonClick} className="navbar-brand" href={"/"} >
              <img src="/townhall.png" alt="img" width="auto" height="100"/>
          </a>
          <div>
          <ul className="dune">
          <a className="dune" href="https://dune.com/cultdaoio/cult-dao" >Stats</a>
          </ul>
          <ul className="dune">
          <a className="dune" href="https://cultdao.io/manifesto.pdf" >Docs</a>
          </ul>
          </div>
          <form className="form-inline" role="search">
          {user ? (
            <>
              <span className="userdisplay">{user.displayName}</span>
              <button onClick={handleLogout} type="button" className="btn btn-danger logout-button">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-dark login-button">Login</Link>
              <Link to="/register" className="btn btn-danger signup-button">Sign up</Link>
            </>
          )}
          </form>
      </div>
    </nav>
  );
  

}



export default Navbar;