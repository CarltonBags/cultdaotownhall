import React, {useState} from "react";
import {db} from "./firebaseConfig";
import ReactQuill from "react-quill";
import { getDocs, addDoc, collection } from "firebase/firestore";
import "./SubmitComment.css";
import { getAuth } from "firebase/auth";






function SubmitComment ({proposalData, commentUpdate}) {

    const auth = getAuth();
    const data = proposalData;

    const [comment, setComment] = useState("");

    const handleInputChange = (value) => {
        setComment(value);
    }

    const postComment = async (event, ) => {
        event.preventDefault();
        console.log("post Comment");

        
        if (!auth.currentUser) {
            alert('You need to be logged in to post a comment.');
            return;
        }
        const date = new Date();
        const dateString = date.toISOString();

        await addDoc(collection(db, "comments"), {
            id: data.id,
            time: dateString,
            comment: comment,
            user:auth.currentUser.displayName,
            userId:auth.currentUser.uid
        });

        commentUpdate();
    }



    return (
        <div>
            <form onSubmit={postComment}>
                <ReactQuill 
                className="comment"
                type="text"
                name="comment"
                value= {comment}
                onChange={handleInputChange}
                />
                <p>
                <input className="btn btn-dark" type="submit" value="Submit"/>
                </p>
            </form>
        </div>
    );
}

export default SubmitComment;