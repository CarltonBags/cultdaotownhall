import React from "react";
import "./Comment.css";
import { getAuth } from "firebase/auth";
import "./PitchComment.css";
import { getDocs, addDoc, collection } from "firebase/firestore";
import {db} from "./firebaseConfig";



function PitchComment ({commentData}) {

const auth=getAuth();

    const data= commentData;
    const date= new Date (data.time);
    const formattedMinutes = ("0" + date.getMinutes()).slice(-2); // ensures that minutes are always two digits
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}, ${date.getHours()}:${formattedMinutes}`;


const handleArchive = async (event) => {
        event.preventDefault();
        
        if (!auth.currentUser) {
            alert('You need to be logged in to add a post the file.');
            return;
        }
        const date = new Date();
        const dateString = date.toISOString();

        await addDoc(collection(db, "files"), {
            id: data.id,
            commentId: data.commentId,
            time: dateString,
            comment: data.comment,
            user:auth.currentUser.displayName
        });
    }


    return(
        <div className="main-box" >
            <div className="head">
              <span className="username">{data.user}</span> 
              <span className="date">{formattedDate}</span>
            </div>
            <div className="text" dangerouslySetInnerHTML={{ __html: data.comment }}/>
            <div className="comment-footer">
            <button onClick={handleArchive} className="archive">archive</button>
            </div>
        </div>
    );

}

export default PitchComment;