import { query, doc, getDocs, collection, where } from "firebase/firestore";
import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {db} from "./firebaseConfig";
import "./ProposalPage.css";
import SubmitComment from "./SubmitComment";
import Comment from "./Comment";


function ProposalPage () {

    let {id} = useParams();
    
    let [proposalData, setProposalData] = useState("");
    let [commentData, setCommentData] = useState([]);

    useEffect (() => {
        
        const fetchProposalData = async () => {
            const q = query(collection(db, "proposals"), where("id", "==", parseInt(id)));
            console.log("Parsed id:", parseInt(id));
            console.log("Query:", q);

            const querySnapshot= await getDocs(q);
            console.log("Query snapshot:", querySnapshot);

                if (!querySnapshot.empty) {
                    const data = querySnapshot.docs[0].data();
                    console.log("Data from Firestore:", data); // log the fetched data
                    setProposalData(data);
                } else {
                    console.error("No document found for id:", id);

                }

            }

        fetchProposalData();

    }, [id]);

    console.log(proposalData)

    useEffect (() => {
            const fetchCommentData = async () => {
            const q = query(collection(db, "comments"), where("id", "==", parseInt(id)));
            const querySnapshot= await getDocs(q);
            const tempCommentData = [];
            querySnapshot.forEach((doc) => {
                tempCommentData.push(doc.data());
            });

                tempCommentData.sort((a, b) => new Date(a.time) - new Date(b.time));


            setCommentData(tempCommentData);

        }

        fetchCommentData();

    }, [commentData]);


    if (!proposalData) {

        return <div>Revoloading...</div>;
    }

    const {title, description} = proposalData;

    return (
        <div className="container">
            <div className="sub-container">
                <h1 className="headline">- CIP-{id} -</h1>
                <h1 className="sub-headline">{title}</h1>
                <div className="description" dangerouslySetInnerHTML={{ __html: description}} />
            </div>
                <h1 className="discussion-headline">- Discussion -</h1>
                {commentData.map((commentData) => (<div key={commentData.id}><Comment commentData={commentData}/> </div>))}
                <SubmitComment proposalData={proposalData} />
        </div>

    );
}

export default ProposalPage;