import React, {useState} from "react";
import {db} from "./firebaseConfig";
import ReactQuill from "react-quill";
import { getDocs, addDoc, collection } from "firebase/firestore";
import "./SubmitComment.css";
import { getAuth } from "firebase/auth";






function SubmitPitchComment ({pitchData, triggerUpdate}) {

    const auth = getAuth();
    const data = pitchData;

    const [comment, setComment] = useState("");

    const handleInputChange = (value) => {
        setComment(value);
    }

    const postComment = async (event) => {
        event.preventDefault();
        
        if (!auth.currentUser) {
            alert('You need to be logged in to post a comment.');
            return;
        }
        const date = new Date();
        const dateString = date.toISOString();

       /* let highestCommentId = 0;

        const querySnapshot = await getDocs(collection(db, "pitchcomments"));
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            if (data.commentId && data.commentId > highestCommentId) {
                highestCommentId = data.commentId;
            }
        });*/


        await addDoc(collection(db, "pitchcomments"), {
            id: data.id,
            //commentId: highestCommentId +1,
            time: dateString,
            comment: comment,
            userId: auth.currentUser.uid,
            user:auth.currentUser.displayName
        });

        setComment("");

        triggerUpdate();
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

export default SubmitPitchComment;