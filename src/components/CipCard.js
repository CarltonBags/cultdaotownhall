import React from "react";
import "./CipCard.css";
import {Link} from "react-router-dom";



function CipCard () {

    console.log("CipCard is rendering");



    return (
        <div className="cip-container">
            <div className="cip-sub-container">
            <h2 className="cip-header"> Improvement Motions</h2>
            <div className="cip-image">
            <img className="cip-img" src="/brand.png" alt="cip"/>
            </div>
            <div className="button-container">
                <div className="enter">
                 <Link to="/proposalList" className="btn btn-dark enter-btn">Explore</Link>
                </div>
                <div className="submit">
                 <Link to="/submit" className="btn btn-danger submit-btn">Submit</Link>
                </div>
                <div className="about">
                    <Link className="about" to="proposalList/about">about</Link>
                 </div>
            </div>
            </div>
        </div>

    );
}

export default CipCard;

