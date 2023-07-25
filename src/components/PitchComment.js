import React, { useEffect, useState } from "react";
import "./Comment.css";
import { getAuth } from "firebase/auth";
import "./PitchComment.css";
import { query, doc, setDoc, deleteDoc, getDoc, addDoc, getDocs, collection, where, updateDoc } from "firebase/firestore";
import {db} from "./firebaseConfig";



function PitchComment ({commentData}) {

    const auth=getAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [newComment, setNewComment] = useState('');
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

        const commentQuery = collection(db, "files");
        const commentsSnapshot = await getDocs(commentQuery);
        const commentExists = commentsSnapshot.docs.some(doc => 
            doc.data().commentId === data.commentId && doc.data().id === data.id
         );

    if (commentExists) {
        // If the comment already exists
        alert("Comment already exists in the file.");
        return;
    }
        await addDoc(collection(db, "files"), {
            id: data.id,
            commentId: data.commentId,
            time: dateString,
            comment: data.comment,
            user:auth.currentUser.displayName
        });
        
        
    }

    const handleEdit = () => {
        if(data.userId === auth.currentUser.uid){
        setIsEditing(true);
        setNewComment(data.comment); // Populate input box with current comment
        } else{
            alert("you can only edit comments you have posted yourself")
        }
    }

    const handleEditSubmit = async () => {
        if (!auth.currentUser) {
            alert('You need to be logged in to edit a comment.');
            return;
        }
        const commentRef = doc(db, 'pitchComments', `${data.id}-${data.commentId}`);
    
        // Update the comment in Firestore
        await updateDoc(commentRef, {comment: newComment});
    
        // Reset state
        setIsEditing(false);
        setNewComment('');
    }

    return(
        <div className="main-box" >
            {isEditing ? (
                <div>
                    <textarea value={newComment} onChange={e => setNewComment(e.target.value)} />
                    <button onClick={handleEditSubmit}>Submit</button>
                </div>
            ) : (
                <div>
                    <div className="head">
                      <span className="username">{data.user}</span> 
                      <span className="date">{formattedDate}</span>
                    </div>
                    <div className="text" dangerouslySetInnerHTML={{ __html: data.comment }}/>
                    <div className="comment-footer">
                        <button onClick={handleArchive} className="archive">archive</button>
                        <button onClick={handleEdit} className="archive">edit</button>
                    </div>
                </div>
            )}
        </div>
    );
}


export default PitchComment;