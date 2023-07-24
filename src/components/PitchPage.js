import { query, doc, setDoc, deleteDoc, getDoc, addDoc, getDocs, collection, where } from "firebase/firestore";
import React, {useState, useEffect} from "react";
import {db} from "./firebaseConfig";
import "./ProposalPage.css";
import "./PitchPage.css";
import SubmitPitchComment from "./SubmitPitchComment";
import PitchComment from "./PitchComment";
import { useNavigate, useParams} from "react-router-dom";
import { getAuth } from "firebase/auth";
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';




function PitchPage () {

    const navigate = useNavigate();
    const auth = getAuth();
    let {id} = useParams();
    
    let [pitchData, setPitchData] = useState("");
    let [pitchCommentData, setPitchCommentData] = useState([]);
    let [upVotes, setUpvotes] = useState(0);
    let [downVotes, setDownvotes] = useState(0);

    useEffect (() => {
        
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

    }, [id]);

    console.log(pitchData)

    useEffect (() => {
            const fetchPitchCommentData = async () => {
            const q = query(collection(db, "pitchcomments"), where("id", "==", parseInt(id)));
            const querySnapshot= await getDocs(q);
            const tempPitchCommentData = [];
            querySnapshot.forEach((doc) => {
                tempPitchCommentData.push(doc.data());
            });

                tempPitchCommentData.sort((a, b) => new Date(a.time) - new Date(b.time));


            setPitchCommentData(tempPitchCommentData);

        }

        fetchPitchCommentData();

    }, [id]);

    const fetchUpvoteData = async () => {
        const q = query(collection(db, "upvotes"), where("pitchId", "==", pitchData.id), where("isUpvote", "==", true));
        const querySnapshot = await getDocs(q);
        setUpvotes(querySnapshot.size);
    }

    const fetchDownvoteData = async () => {
        const q = query(collection(db, "upvotes"), where("pitchId", "==", pitchData.id), where("isUpvote", "==", false));
        const querySnapshot = await getDocs(q);
        setDownvotes(querySnapshot.size);
    }
  

    useEffect(() => {
        if (pitchData && pitchData.id) {
            fetchDownvoteData();
        }
    }, [pitchData]);
    
    useEffect(() => {
        if (pitchData && pitchData.id) {
            fetchUpvoteData();
        }
    }, [pitchData]);
    

    const castUpvote = async (event) => {
        event.preventDefault();
        
        if (!auth.currentUser) {
            alert('You need to be logged in to vote.');
            return;
        }
    
        const voteRef = doc(db, 'upvotes', `${pitchData.id}_${auth.currentUser.uid}`);
        const voteSnapshot = await getDoc(voteRef);
    
        if (voteSnapshot.exists()) {
            if (voteSnapshot.data().isUpvote) {
                // The user is toggling their vote off, so delete it.
                await deleteDoc(voteRef);
            } else {
                // The user is changing their vote from down to up, so update it.
                await setDoc(voteRef, { pitchId: pitchData.id, userId: auth.currentUser.uid, isUpvote: true });
            }
        } else {
            // The user hasn't voted yet, so create a new upvote.
            await setDoc(voteRef, { pitchId: pitchData.id, userId: auth.currentUser.uid, isUpvote: true });
        }
    
        // Fetch the updated vote count.
        fetchUpvoteData();
        fetchDownvoteData();
    }

    const castDownvote = async (event) => {
        event.preventDefault();
        
        if (!auth.currentUser) {
            alert('You need to be logged in to vote.');
            return;
        }
    
        const voteRef = doc(db, 'upvotes', `${pitchData.id}_${auth.currentUser.uid}`);
        const voteSnapshot = await getDoc(voteRef);
    
        if (voteSnapshot.exists()) {
            if (!voteSnapshot.data().isUpvote) {
                // The user is toggling their vote off, so delete it.
                await deleteDoc(voteRef);
            } else {
                // The user is changing their vote from up to down, so update it.
                await setDoc(voteRef, { pitchId: pitchData.id, userId: auth.currentUser.uid, isUpvote: false });
            }
        } else {
            // The user hasn't voted yet, so create a new upvote.
            await setDoc(voteRef, { pitchId: pitchData.id, userId: auth.currentUser.uid, isUpvote: false });
        }
    
        // Fetch the updated vote count.
        fetchDownvoteData();
        fetchUpvoteData();
    }
    

    if (!pitchData) {

        return <div>Revoloading...</div>;
    }

    const {name, socials, description, investment, user} = pitchData;


    const handleFileClick = () => {
        navigate(`/pitchList/pitchPage/${pitchData.id}/file`,{ state: { pitchCommentData } } );
    }

    return (
        <div className="container">
            <div className="sub-container">
                <h1 className="headline">- {name} -</h1>
                <p className="pitch-header">Submitted by: {user}</p>
                <h3 className="pitch-header">- Project Description -</h3>
                <div className="project-description" dangerouslySetInnerHTML={{ __html: description}} />
                <h3 className="pitch-header">- Investment Condititons -</h3>
                <div className="project-description" dangerouslySetInnerHTML={{ __html: investment}} />
                <h3 className="pitch-header">- Project Socials -</h3>
                <p className="project-socials">{socials}</p>
            </div>
            <div className="vote">
                <div className="up">Up: {upVotes}</div>
                <div className="down">Down: {downVotes}</div>
            </div>
            <div className="vote-header">Vote:</div>
            <button className="btn btn-dark down" onClick={castUpvote}><FaArrowUp /></button>
            <button className= "btn btn-dark down" onClick={castDownvote}><FaArrowDown /></button>
                <div className="file-icon">
                    <button className= "btn btn-danger" onClick={handleFileClick}>File</button>
                </div>
                <h1 className="discussion-headline">- Discussion -</h1>
                {pitchCommentData.map((commentData) => (<div key={commentData.id}><PitchComment commentData={commentData}/> </div>))}
                <SubmitPitchComment pitchData={pitchData} />
        </div>

    );

}

export default PitchPage