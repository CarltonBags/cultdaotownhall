import React from "react";
import "./ProposalCard.css";

function ProposalCard ({proposal}) {


    return (
        <div className="p-card-container">
            <h3 className="proposal-id"> CIP-{proposal.id}</h3>
            <h2 className="proposal-title">{proposal.title}</h2>
            <div className="proposal-submitter-container">
                <h3 className="proposal-submitter">Submitted by: {proposal.user}</h3>
            </div>
        </div>
    );

}

export default ProposalCard;