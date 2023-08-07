import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, Link } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import "./Navbar.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';





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
    <img src="/townhall.png" alt="img" width="auto" height="80"/>
  </a>
  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
    <ul className="navbar-nav ml-auto center-nav">
      <li className="nav-item">
        <a className="nav-link dune" href="https://cultdao.io/manifesto.pdf">Docs</a>
      </li>
      <li className="nav-item">
        <a className="nav-link dune" href="https://dune.com/cultdaoio/cult-dao">Stats</a>
      </li>
    </ul>
    <div className="form-container">
      <form className="form-inline my-2 my-lg-0" role="search">
        {user ? (
          <>
            <button onClick={handleLogout} type="button" className="btn btn-danger logout-button  mr-sm-2">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-dark login-button">Login</Link>
            <Link to="/register" className="btn btn-danger signup-button">Sign up</Link>
          </>
        )}
      </form>
    </div>
  </div>
</nav>

    /*
    <nav className="navbar-expand-lg nav-style">
          <a onClick= {handleButtonClick} className="navbar-brand" href={"/"} >
              <img src="/townhall.png" alt="img" width="auto" height="100"/>
          </a>
           <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
             <span class="navbar-toggler-icon"></span>
           </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto dune">
              <li className="nav-item">
                  <a className="dune" href="https://dune.com/cultdaoio/cult-dao" >Stats</a>
              </li>
               <li className="dune">
                 <a className="dune" href="https://cultdao.io/manifesto.pdf" >Docs</a>
               </li>
          </ul>
         
          
          
          <form className="form-inline" role="search">
          {user ? (
            <>
              <span className="userdisplay">{user.displayName}</span>
              <button onClick={handleLogout} type="button" className="btn btn-danger logout-button">Logout</button>
            </>
          ) : (
            < div className="container-fluid">
              <Link to="/login" className="btn btn-dark login-button">Login</Link>
              <Link to="/register" className="btn btn-danger signup-button">Sign up</Link>
            </div>
          )}
          </form>
          </div>
    </nav>*/
  );
  

}



export default Navbar;