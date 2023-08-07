import React from "react";
import "./WorkspaceCard.css";
import { Link } from "react-router-dom";


function WorkspaceCard ({proposal}) {

    const handleClick = () => {
       < Link to = "/workspaceList/createWorkspace" />
    }



    return (
        <div className="p-card-container">
            <h3 className="proposal-id"> Add Workspace</h3>
            <div className="add" onClick={handleClick}> + </div>
        </div>
    );

}

export default WorkspaceCard;