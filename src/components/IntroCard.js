import React from "react";
import "./IntroCard.css";
import {Link} from "react-router-dom";



function IntroCard () {

    console.log("IntroCard is rendering");



    return (


    <div class="card col card-style" >
        <h5 class="card-title cip-header">Improvement Motions</h5>
        <img class="card-img-top" src="/pitch.png" alt="Card image cap" />
        <div class="card-body body-container">
            <div className="enter">
              <Link to="/pitchList" className="btn btn-dark enter-btn">Explore</Link>
            </div>
              <div className="submit">
                 <Link to="/submitPitch" className="btn btn-danger submit-btn">Pitch</Link>
             </div>
             <div className="about">
                <Link className="about" to="/proposalList/about">about</Link>
             </div>
     </div>
</div>


    );
}

export default IntroCard;

