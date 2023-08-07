import React, { useState, useEffect, useContext } from "react";
import { query, getDocs, collection } from "firebase/firestore";
import { db } from "./firebaseConfig";
import "./ProposalList.css";
import PitchCard from "./PitchCard";
import "./PitchList.css";
import { useNavigate, useParams} from "react-router-dom";
import {VoteContext} from "../context/VoteContext";


function PitchList() {
  /* eslint-disable no-unused-vars */

  let {id} = useParams();
  const navigate = useNavigate();
  const [pitchInfo, setPitchInfo] = useState([]);

  /* eslint-disable no-unused-vars */
  const {votes, setVotes} = useContext(VoteContext)
  



  useEffect(() => {
    console.log("Pitchlist is rendering");

    const fetchPitchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "pitches"));
        const data = querySnapshot.docs.map((doc) => {
          const pitchData = doc.data();
          console.log(pitchData);
          

          //Do something with the data
         /* const logoURL = pitchData.logo
          ? "https://firebasestorage.googleapis.com/v0/b/improving-cult-dao.appspot.com/o/" +
            encodeURIComponent(pitchData.logo) +
            "?alt=media"
          : null;*/

         return {
            id: doc.id,
            ...pitchData,
          };
        });

        setPitchInfo(data);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPitchData();
  },[]);

useEffect (() => {
  const fetchVoteData = async () => {
    const q = query(collection(db, "upvotes"));
    const querySnapshot = await getDocs(q);
    const votesData = {}; // Object to hold our vote data
  
    querySnapshot.forEach((doc) => {
      const voteData = doc.data();
      const pitchId = voteData.pitchId;
      const isUpvote = voteData.isUpvote;
  
      if (!votesData[pitchId]) {
        // If there's no entry for this pitchId, create one
        votesData[pitchId] = {
          upvotes: 0,
          downvotes: 0
        };
      }
  
      if (isUpvote) {
        // If the vote is an upvote, increment the upvotes field
        votesData[pitchId].upvotes += 1;
      } else {
        // If the vote is a downvote, increment the downvotes field
        votesData[pitchId].downvotes += 1;
      }
    });
  
    // Set the state
    setVotes(votesData);
  }
  fetchVoteData();
    /* eslint-disable */
},[])

  
  

  const handlePitchClick = (pitchInfo) => {
    navigate(`/pitchList/pitchPage/${pitchInfo.id}`, {state: {pitchInfo}});
  };

  return (
    <div>
        <h3 className="disclaimer">
          ATTENTION: The projects shown below are neither partnered with nor
          endorsed by Cult DAO!{" "}
        </h3>
      <div>
        <h1 className="pitch-table-header">Pitch Table</h1>
      </div>
      <div className="proposal-list">
        {pitchInfo.map((pitch) => (
          <div key={pitch.id} onClick={() => handlePitchClick(pitch)}>
            <PitchCard pitch={pitch} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PitchList;
