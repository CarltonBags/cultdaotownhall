import React, {useState} from "react";
import "./LandingPage.css";
import About from "./About";
import { Link } from "react-router-dom";
import CipCard from "./CipCard";
import IntroCard from "./IntroCard";






function LandingPage () {
    console.log("LandingPage is rendering");

   
    return (
        <div>
            <h1 className="header">- Cult DAO Town Hall -</h1>
            <div className="cip">
                    <CipCard />
                    <IntroCard />
            </div>
            
        </div>
    );
}

export default LandingPage;