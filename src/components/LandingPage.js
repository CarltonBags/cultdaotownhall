import React from "react";
import "./LandingPage.css";
import CipCard from "./CipCard";
import IntroCard from "./IntroCard";






function LandingPage () {
   
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