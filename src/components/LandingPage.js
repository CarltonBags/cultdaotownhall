/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import "./LandingPage.css";
import "./IntroCard.css";
import {Link} from "react-router-dom";






function LandingPage () {
   
 return (

    <div className="main">
        <div className="lp-header">
            <h1 className="lp-header">- Cult DAO Town Hall -</h1>
        </div>
        <div className="cip">
            <div className="row justify-content-around">
                <div class="card col-xs-10 col-sm-10 col-md-5 card-style" >
                    <h5 className="card-title cip-header">Pitch Table</h5>
                     <img className="card-img-top" src="/pitch1.png" alt="Card image cap" />
                <div className="card-body body-container">
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
                <div className="card col-xs-10 col-sm-10 col-md-5 card-style" >
                    <h5 className="card-title cip-header">Improvement Motions</h5>
                    <img className="card-img-top" src="/brand1.png" alt="Card image cap" />
                    <div className="card-body">
                        <div className="enter">
                            <Link to="/proposalList" className="btn btn-dark submit-btn">Explore</Link>
                        </div>
                        <div className="submit">
                            <Link to="/submit" className="btn btn-danger submit-btn">Submit</Link>
                        </div>
                        <div className="about">
                            <Link className="about" to="/proposalList/aboutpitch">about</Link>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    </div>
    );
}

export default LandingPage;