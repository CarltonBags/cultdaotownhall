import React from "react";
import {Link} from "react-router-dom";
import "./Card.css";



function CipCard () {

    return (
        <div className="container">
            <h2 className="cip-header"> Improvement Motions</h2>
            <img className="img-fluid" src="/brand.png" alt="cip"/>
            <div className="sexy container-fluid">
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

    );
}

export default CipCard;

