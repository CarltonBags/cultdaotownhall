import { query, doc, setDoc, deleteDoc, getDoc, getDocs, collection, where } from "firebase/firestore";
import React, {useState, useEffect, useContext} from "react";
import {db} from "./firebaseConfig";
import "./ProposalPage.css";
import "./PitchPage.css";
import SubmitPitchComment from "./SubmitPitchComment";
import PitchComment from "./PitchComment";
import { useNavigate, useParams, useLocation} from "react-router-dom";
import { getAuth } from "firebase/auth";
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import {VoteContext} from "../context/VoteContext";
import DOMPurify from "dompurify";




function PitchPage (props) {

    const navigate = useNavigate();
    const auth = getAuth();
    let {id} = useParams();
    
    let [pitchData, setPitchData] = useState("");
    let [pitchCommentData, setPitchCommentData] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const {votes, setVotes} = useContext(VoteContext);
    const location = useLocation();
    const pitchInfo= location.state ? location.state.pitchInfo : props.pitchInfo;

    


    useEffect(() => {
        setPitchData(pitchInfo)
    },[pitchInfo, id]);


   /* useEffect (() => {
        
        const fetchPitchData = async () => {
            const q = query(collection(db, "pitches"), where("id", "==", parseInt(id)));
            console.log("Parsed id:", parseInt(id));
            console.log("Query:", q);

            const querySnapshot= await getDocs(q);
            console.log("Query snapshot:", querySnapshot);

                if (!querySnapshot.empty) {
                    const data = querySnapshot.docs[0].data();
                    console.log("Data from Firestore:", data); // log the fetched data
                    setPitchData(data);
                } else {
                    console.error("No document found for id:", id);
                }

            }

        fetchPitchData();

    }, []);*/


    useEffect (() => {
            const fetchPitchCommentData = async () => {
            const q = query(collection(db, "pitchcomments"), where("pitchId", "==", pitchInfo.id));
            const querySnapshot= await getDocs(q);
            const tempPitchCommentData = [];
            querySnapshot.forEach((doc) => {
                tempPitchCommentData.push({...doc.data(),
                    docId: doc.id
                });
            });

                tempPitchCommentData.sort((a, b) => new Date(a.time) - new Date(b.time));


            setPitchCommentData(tempPitchCommentData);

        }

        fetchPitchCommentData();

    }, [refresh, id, pitchInfo]);

   

    const castUpvote = async (event) => {
        event.preventDefault();
        console.log("votes at start of castUpvote", votes);

        
        if (!auth.currentUser) {
            alert('You need to be logged in to vote.');
            return;
        }

        if (!votes[pitchData.id]) {
            setVotes({
                ...votes,
                [pitchData.id]: {
                    upvotes: 0,
                    downvotes: 0
                }
            });
        }
    
        const voteRef = doc(db, 'upvotes', `${pitchData.id}_${auth.currentUser.uid}`);
        const voteSnapshot = await getDoc(voteRef);
    
        if (voteSnapshot.exists()) {
            if (voteSnapshot.data().isUpvote) {
                // The user is toggling their vote off, so delete it.
                await deleteDoc(voteRef);

                //votes[pitchData.id].upvotes--;

            } else {
                // The user is changing their vote from down to up, so update it.
                await setDoc(voteRef, { pitchId: pitchData.id, userId: auth.currentUser.uid, isUpvote: true });

                //votes[pitchData.id].downvotes++;
                //votes[pitchData.id].upvotes--;
            }
        } else {
            // The user hasn't voted yet, so create a new upvote.
            await setDoc(voteRef, { pitchId: pitchData.id, userId: auth.currentUser.uid, isUpvote: true });
           /* votes[pitchData.id].upvotes++;*/
        }

        /*setVotes({...votes});*/

    }

    const castDownvote = async (event) => {
        event.preventDefault();
        console.log("votes at start of castDownvote", votes);

        
        if (!auth.currentUser) {
            alert('You need to be logged in to vote.');
            return;
        }

        /*if (!votes[pitchData.id]) {
            setVotes({
                ...votes,
                [pitchData.id]: {
                    upvotes: 0,
                    downvotes: 0
                }
            });
        }*/
    
        const voteRef = doc(db, 'upvotes', `${pitchData.id}_${auth.currentUser.uid}`);
        const voteSnapshot = await getDoc(voteRef);
    
        if (voteSnapshot.exists()) {
            if (!voteSnapshot.data().isUpvote) {
                // The user is toggling their vote off, so delete it.
                await deleteDoc(voteRef);

                /*votes[pitchData.id].downvotes--;*/

            } else {
                // The user is changing their vote from up to down, so update it.
                await setDoc(voteRef, { pitchId: pitchData.id, userId: auth.currentUser.uid, isUpvote: false });
                /*votes[pitchData.id].upvotes--;
                votes[pitchData.id].downvotes++;*/
            }
        } else {
            // The user hasn't voted yet, so create a new upvote.
            await setDoc(voteRef, { pitchId: pitchData.id, userId: auth.currentUser.uid, isUpvote: false });
            /*votes[pitchData.id].downvotes++;*/
        }

       /* setVotes({...votes});*/
    
    }
   

    const {name, socials, description, investment, user} = pitchData;

    const triggerUpdate = () => {
        setRefresh(!refresh);
    }
    const handleFileClick = () => {
        navigate(`/pitchList/pitchPage/${pitchData.id}/file`,{ state: { pitchCommentData, pitchData} } );
    }

    let cleanDescription = DOMPurify.sanitize(description);
    let cleanInvestment = DOMPurify.sanitize(investment);

    
    return (
        <div className="container">
            <div className="sub-container">
                <h1 className="headline">- {name} -</h1>
                <p className="pitch-header">Submitted by: {user}</p>
                <h3 className="pitch-header">- Project Description -</h3>
                <div className="project-description" dangerouslySetInnerHTML={{ __html: cleanDescription}} />
                <h3 className="pitch-header">- Investment Condititons -</h3>
                <div className="project-description" dangerouslySetInnerHTML={{ __html: cleanInvestment}} />
                <h3 className="pitch-header">- Project Socials -</h3>
                <p className="project-socials">{socials}</p>
            </div>
        
            <div className="vote-header">Vote:</div>
            <button className="btn btn-dark down" onClick={castUpvote}><FaArrowUp /></button>
            <button className= "btn btn-dark down" onClick={castDownvote}><FaArrowDown /></button>
                <div className="file-icon">
                    <button className= "btn btn-danger" onClick={handleFileClick}>File</button>
                </div>
                <h1 className="discussion-headline">- Discussion -</h1>
                {pitchCommentData.map((commentData) => (<div key={commentData.docId}><PitchComment pitchInfo={pitchInfo} pitchCommentData={pitchCommentData} triggerUpdate={triggerUpdate} commentData={commentData}/> </div>))}
                <SubmitPitchComment triggerUpdate={triggerUpdate} pitchData={pitchData} />
        </div>

    );

}

export default PitchPage;