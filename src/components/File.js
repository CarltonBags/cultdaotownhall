import React, { useState, useEffect } from "react";
import Comment from"./Comment.js";
import { query, doc, getDocs, collection, where } from "firebase/firestore";
import { db } from "./firebaseConfig";
import "./ProposalList.css";
import "./PitchList.css";
import { useParams, useLocation } from "react-router-dom";
import "./File.css";

function File (props) {


    const [file, setFile] = useState([])
    let {id} = useParams();

    const location = useLocation();
    const pitchCommentData = location.state ? location.state.pitchCommentData : props.pitchCommentData;



    useEffect (() => {
        const fetchFileData = async () => {
        const q = query(collection(db, "files"), where("id", "==", parseInt(id)));
        const querySnapshot= await getDocs(q);
        const tempFileData = [];
        querySnapshot.forEach((doc) => {
            tempFileData.push(doc.data());
        });



        setFile(tempFileData);

    }

    fetchFileData();

}, [id]);


if (!file) {

    return <div>Revoloading...</div>;
}


    return (
        <div>
            <h2 className="file-header">File</h2>
        {Array.isArray(file) && file.map((commentData) => (
          <div key={commentData.id}>
            <Comment commentData={commentData} />
          </div>
        ))}
        </div>
    );
}

export default File;