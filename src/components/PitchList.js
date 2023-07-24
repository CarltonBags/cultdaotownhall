import React, { useState, useEffect } from "react";
import { query, doc, setDoc, deleteDoc, getDoc, addDoc, getDocs, collection, where } from "firebase/firestore";
import { db } from "./firebaseConfig";
import "./ProposalList.css";
import PitchCard from "./PitchCard";
import "./PitchList.css";
import { useNavigate, useParams} from "react-router-dom";

function PitchList() {
  let {id}=useParams;
  const navigate = useNavigate();
  const [pitchInfo, setPitchInfo] = useState([]);
  let [upVotes, setUpvotes] = useState(0);
  let [downVotes, setDownvotes] = useState(0);


  useEffect(() => {
    const fetchPitchData = async () => {
      try {
        //fetch the documents in the collection
        const querySnapshot = await getDocs(collection(db, "pitches"));

        //Process the retrieved docs
        const data = querySnapshot.docs.map((doc) => {
          //Access the document data
          const pitchData = doc.data();

          //Do something with the data
          const logoURL = pitchData.logo
          ? "https://firebasestorage.googleapis.com/v0/b/improving-cult-dao.appspot.com/o/" +
            encodeURIComponent(pitchData.logo) +
            "?alt=media"
          : null;

          return {
            id: doc.id,
            ...pitchData,
            logoURL,
          };
        });

        setPitchInfo(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPitchData();
  }, []);

  

  const handlePitchClick = (pitchInfo) => {
    navigate(`/pitchList/pitchPage/${pitchInfo.id}`);
  };

  return (
    <div>
        <h3 className="disclaimer">
          ATTENTION: The projects shown below are neither partnered with nor
          endorsed by Cult DAO!{" "}
        </h3>
      <div>
        <h1 className="header">Project Introductions</h1>
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
