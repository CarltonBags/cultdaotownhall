import React, { useContext } from "react";
import "./ProposalPage.css";
import "./PitchPage.css";

import "./PitchCard.css";
import {VoteContext} from "../context/VoteContext";

function PitchCard({ pitch }) {
  
  const {votes} = useContext(VoteContext);

 /* const fetchUpvoteData = async () => {
    console.log("fetchUpVoteData in PitchCard");

    const q = query(
      collection(db, "upvotes"),
      where("pitchId", "==", pitch.id),
      where("isUpvote", "==", true)
    );
    const querySnapshot = await getDocs(q);
    setUpvotes(querySnapshot.size);
  };

  const fetchDownvoteData = async () => {
    console.log("fetchDownVoteData in PitchCard");

    const q = query(
      collection(db, "upvotes"),
      where("pitchId", "==", pitch.id),
      where("isUpvote", "==", false)
    );
    const querySnapshot = await getDocs(q);
    setDownvotes(querySnapshot.size);
  };

  useEffect(() => {
    console.log("useEffect fetchPitchVotedata in PitchCard");

    fetchDownvoteData();
    fetchUpvoteData();
  }, []);
  */

  return (
    <div className="hard-container">
      <h3 className="project-name">{pitch.name}</h3>
      <div className="votes-container">
        <div className="card-vote">Up: {votes[pitch.id] ? votes[pitch.id].upvotes : 0}</div>
        <div className="card-vote">Down: {votes[pitch.id] ? votes[pitch.id].downvotes : 0}</div>
      </div>
      {pitch.logo && (
        <img className="project-logo" src={pitch.logo} alt="Project Logo" />
      )}
      <h3 className="project-owner">Submitted by: {pitch.user}</h3>
    </div>
  );
}

export default PitchCard;
