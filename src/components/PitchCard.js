import React, { useState, useEffect, useContext } from "react";
import { query, doc, setDoc, deleteDoc, getDoc, addDoc, getDocs, collection, where } from "firebase/firestore";
import { db } from "./firebaseConfig";
import "./ProposalPage.css";
import "./PitchPage.css";
import SubmitPitchComment from "./SubmitPitchComment";
import PitchComment from "./PitchComment";
import { useNavigate, useParams } from "react-router-dom";
import "./PitchCard.css";
import {VoteContext} from "../context/VoteContext";

function PitchCard({ pitch }) {
  let [upVotes, setUpvotes] = useState(0);
  let [downVotes, setDownvotes] = useState(0);
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
    <div className="card-container">
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
