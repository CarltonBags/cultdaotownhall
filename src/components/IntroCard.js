import React from "react";
import "./IntroCard.css";
import {Link} from "react-router-dom";



function IntroCard () {

    console.log("IntroCard is rendering");



    return (
        <div className="cip-container">
            <div className="cip-sub-container">
            <h2 className="cip-header">Pitch Table</h2>
            <div className="intro-image">
            <img className="pit-img" src="/pitch.png" alt="name" />
            </div>
            <div className="button-container">
                <div className="enter">
                 <Link to="/pitchList" className="btn btn-dark enter-btn">Explore</Link>
                </div>
                <div className="submit">
                 <Link to="/submitPitch" className="btn btn-danger submit-btn">Pitch</Link>
                </div>
                <div className="about">
                <Link className="about" to="/proposalList/aboutpitch">about</Link>
                </div>
            </div >
            </div>
        </div>

    );
}

export default IntroCard;

