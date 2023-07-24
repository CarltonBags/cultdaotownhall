import React from "react";
import "./About.css";

function About () {

    return (

    <div className="site-details">
        <h2>CIPs</h2>
        <p>
          <strong>Cult DAO Improvement Proposals (CIPs)</strong> are procedures that aim to modify or add processes currently adopted by Cult DAO.
          These proposals can aim to modify either <strong>technical</strong> or <strong>non-technical</strong> components. Furthermore, CIPs can be of the type <strong> vote</strong> as well as <strong>non-vote</strong>, with proposals of the type <strong>vote</strong> having a binding change on internal processes, while proposals of the type <strong>non-vote</strong> are to be viewed more as an open letter to the community or food for thought.
        </p>
        <h2>Contributing</h2>
        <p>
          Submitting or discussing a CIP is a <strong>non-token-gated process</strong>, meaning that every user that is registered on the website can submit and discuss CIPs.
          Voting on the adoption of a CIP is a <strong>token-gated process</strong>, meaning you need to have <strong>$dCULT</strong> in your wallet to take part in the snapshot vote.
        </p>
        <h2>Process</h2>
        <p>Once a CIP has been submitted by a user, the proposal can be openly discussed by community members until the opinions accumulated in the discussion section below each CIP. There is no fixed time frame for the discussion of the CIP. Once it transpires in the discussion if the proposed modification to Cult DAO might be beneficial or detrimental, the CIP can be put up to a snapshot vote on https://snapshot.org/#/cultdaoart.eth.</p>
        <p>Every CIP should at least contain the following:</p>
        <ul className="dotted-list">
          <li><strong>Motivation</strong> (What is wrong?)</li>
          <li><strong>Solution</strong> (How would the correct process look?)</li>
          <li><strong>How to implement the solution?</strong></li>
        </ul>
        <h2>Rules</h2>
        <p>
          Discussions should remain factual and focus on the content of a CIP. Posts that include personal attacks or off-topic discussions will be removed.
          Racism, Sexism, Threats, Spamming or any other intentional behavior that is obstructing the factual nature of the discourse will lead to a ban.
        </p>

    </div>
    )
    
}

export default About;