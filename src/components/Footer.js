import React from "react";
import "./Footer.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaTwitter } from 'react-icons/fa';



function Footer () {

    const twitterURL = "https://twitter.com/wearecultdao"; // replace with your twitter url
    const websiteURL = "https://cultdao.io"; // replace with your website url

    return (

    <div className="footer-container">
        <h3>Please also visit</h3>
        <div>
            <a className="twitter-logo" href={twitterURL} target="_blank" rel="noopener noreferrer">
                <FaTwitter size={20} /> 
            </a>
            <a className="website-logo" href={websiteURL} target="_blank" rel="noopener noreferrer">
                <span>cultdao.io</span>
            </a>
        </div>
    </div>
    )
    
}

export default Footer;