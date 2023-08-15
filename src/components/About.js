import React from "react";
import "./About.css";

function About () {

    return (

    <div className="site-details">
      <h1 className="welcome-heading">About CIMs</h1>
        <h2>CIMs</h2>
        <p>
          <strong>Cult DAO Improvement Motions (CIMs)</strong> are procedures that aim to modify or add processes currently adopted by Cult DAO.
          These motions can aim to modify either <strong>technical</strong> or <strong>non-technical</strong> components. Furthermore, CIMs can lead to a <strong>snapshot vote</strong>, if voting action is required to determine a binding outcome (e.g. a motion to implement new governance guidelines). However, not all motions attempting to improve Cult DAO might require a vote to cause the desired effect. Those <strong>non-vote</strong>-motions are to be viewed more as an open letter to the community or food for thought.
        </p>
        <h2>Contributing</h2>
        <p>
          Submitting or discussing a CIM is a <strong>non-token-gated process</strong>, meaning that every user that is registered on the website can submit and discuss CIMs.
          Voting on the adoption of a CIM is a <strong>token-gated process</strong>, meaning you need to have <strong>$dCULT</strong> in your wallet to take part in the snapshot vote.
        </p>
        <h2>Process</h2>
        <p>Once a CIM has been submitted by a user, the motion can be openly discussed by community members in the discussion section below each CIM. Furthermore, every registered user can request an amendment to the motion presented, which can be approved or denied by the publisher of the CIM. There is no fixed timeframe for the discussion of the CIM. Once it transpires in the discussion if the modification to Cult DAO might be beneficial or detrimental, the CIM can be put up to a snapshot vote (if required) on https://snapshot.org/#/cult-dao.eth.</p>
        <p>Every CIM should at least contain the following:</p>
        <ul className="dotted-list">
          <li><strong>Motivation</strong> (What is wrong?)</li>
          <li><strong>Solution</strong> (How would the correct process look?)</li>
          <li><strong>How to implement the solution?</strong></li>
        </ul>
        <h2>Rules</h2>
        <p>
          Discussions should remain factual and focus on the content of a CIM. Posts that include personal attacks or off-topic discussions will be removed.
          Racism, Sexism, Threats, Spamming or any other intentional behavior that is obstructing the factual nature of the discourse will lead to a ban.
        </p>

    </div>
    )
    
}

export default About;