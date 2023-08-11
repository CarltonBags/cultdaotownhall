import React from "react";
import "./ProposalCard.css";

function ProposalCard ({proposal}) {

    const badgeClass = `badge badge-${proposal.category.toLowerCase()}`;


    return (
        <div className="p-card-container">
            <h3 className="proposal-id"> CIM-{proposal.id}</h3>
            <h2 className="proposal-title">{proposal.title}</h2>
            <div className="proposal-submitter-container">
                <h3 className="proposal-submitter">Submitted by: {proposal.user}</h3>
                {proposal.category && <span className={badgeClass}>{proposal.category}</span>}

            </div>
        </div>
    );

}

export default ProposalCard;