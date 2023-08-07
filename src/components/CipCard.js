import React from "react";
import {Link} from "react-router-dom";
import "./Card.css";



function CipCard () {

    return (

        <div class="card col card-style" >
        <h5 class="card-title cip-header">Improvement Motions</h5>
         <img class="card-img-top" src="/brand.png" alt="Card image cap" />
         <div class="card-body">
         <div className="enter">
         <Link to="/submit" className="btn btn-dark submit-btn">Explore</Link>
         </div>
         <div className="submit">
         <Link to="/submit" className="btn btn-danger submit-btn">Submit</Link>
         </div>
         <div className="about">
                <Link className="about" to="/proposalList/aboutpitch">about</Link>
             </div>
         </div>
        </div>





    );
}

export default CipCard;

