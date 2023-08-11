import React, { useState } from "react";
import "./Comment.css";
import { getAuth } from "firebase/auth";
import "./PitchComment.css";
import { doc, addDoc, getDocs, collection, deleteDoc, updateDoc } from "firebase/firestore";
import {db} from "./firebaseConfig";
import DOMPurify from "dompurify";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function PitchComment ({commentData, triggerUpdate, pitchInfo}) {
  
    

    const auth = getAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [isReply, setIsReplying] = useState(false)
    const [newReply, setNewReply] = useState("");
    const date= new Date (commentData.time);
    const formattedMinutes = ("0" + date.getMinutes()).slice(-2); // ensures that minutes are always two digits
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}, ${date.getHours()}:${formattedMinutes}`;

    

    const handleDelete = () => {
        if (auth.currentUser.uid === commentData.userId){
            const docRef = doc(db, 'pitchcomments', commentData.docId);

            deleteDoc(docRef).then(() => {
                console.log("Comment successfully deleted!");
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
            toast.success("comment deleted")
        } else{
            toast.error("you can only delete comments you wrote yourself")
        }
        

    }

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
            doc.data().commentId === commentData.docId
         );

    if (commentExists) {
        // If the comment already exists
        alert("the comment already exists in the file")

        return;
    }
        await addDoc(collection(db, "files"), {
            pitchId: pitchInfo.id,
            commentId: commentData.docId,
            time: dateString,
            comment: commentData.comment,
            user:auth.currentUser.displayName
        });
        
    }

    const handleEdit = () => {
        console.log("handleEdit is rendering");

        if(commentData.userId === auth.currentUser.uid){
            const div = document.createElement('div');
            div.innerHTML = commentData.comment;
            const text = div.textContent || div.innerText || ''; //this will get you the text without html tags

        setIsEditing(true);
        setNewComment(text); // Populate input box with current comment
        } else{
            alert("you can only edit comments you have posted yourself")
        }
    }

    const handleEditSubmit = async () => {
        console.log("handleEditSubmit running");

        if (!auth.currentUser) {
            alert('You need to be logged in to edit a comment.');
            return;
        }
        const commentRef = doc(db, 'pitchcomments', commentData.docId);
    
        // Update the comment in Firestore
        await updateDoc(commentRef, {comment: newComment});
    
        // Reset state
        setIsEditing(false);
        setNewComment('');
        triggerUpdate();
        
    }

    const handleAbortEdit = () =>{
        setIsEditing(false);
    }

    const handleReply = (event) =>{
        setIsReplying(true);
        setNewReply(event.target.value);
    }

    const handleSubmitReply = async () =>{

        const date = new Date();
        const dateString = date.toISOString();

        await addDoc(collection(db, "pitchcomments"), {
            pitchId: pitchInfo.id,
            time: dateString,
            comment: newReply,
            user:auth.currentUser.displayName,
            userId: auth.currentUser.uid,
            reply: isReply,
            originuser: commentData.user,
            origincomment: commentData.comment
        });

        setIsReplying(false);
        setNewReply("");
        triggerUpdate();
    }

    const handleAbortReply = () => {
        setIsReplying(false);
    }

    let cleanComment = DOMPurify.sanitize(commentData.comment);
    let cleanUser = DOMPurify.sanitize(commentData.originuser);
    let cleanOriginComment = DOMPurify.sanitize(commentData.origincomment);


    return (
        <div  >
            <ToastContainer />
            {isEditing ? (
                <div>
                <div >
                    <textarea className="textbox" value={newComment} onChange={e => setNewComment(e.target.value)} />
                </div>
                <div>
                        <button className= "btn btn-dark edit" onClick={handleEditSubmit}>edit</button>
                        <button className= "btn btn-dark edit" onClick={handleAbortEdit}>abort</button>
                    </div>
                </div>
            ) : isReply ? (
                <div>
                    <div className="main-box">
                    <div className="head">
                        <span className="username">{commentData.user}</span> 
                        <span className="date">{formattedDate}</span>
                    </div>
                    {commentData.reply && <p className="replying">Reply @{cleanUser}</p>}
                    <div>
                        <div className="text" dangerouslySetInnerHTML={{ __html: cleanComment }}/>
                        <div className="comment-footer">
                            <button onClick={handleArchive} className="archive">archive</button>
                            <button onClick={handleEdit} className="archive">edit</button>
                            <button onClick={handleReply} className="archive">reply</button>
                        </div>
                    </div>
                </div>
                    <div >
                        <textarea className="textbox" value={newReply} onChange={e => setNewReply(e.target.value)} />
                    </div> 
                    <div>
                        <button className= "btn btn-dark edit" onClick={handleSubmitReply}>reply</button>
                        <button className= "btn btn-dark edit" onClick={handleAbortReply}>abort</button>
                    </div>
                </div>
            ) : (
                <div className="main-box">
                    <div className="head">
                        <span className="username">{commentData.user}</span> 
                        <span className="date">{formattedDate}</span>
                    </div>
                    {commentData.reply && <p className="replying">Reply @{cleanUser}: {cleanOriginComment.slice(0, 30)}</p>}
                    <div>
                        <div className="text" dangerouslySetInnerHTML={{ __html: cleanComment }}/>
                        <div className="comment-footer">
                            <button onClick={handleArchive} className="archive">archive</button>
                            <button onClick={handleEdit} className="archive">edit</button>
                            <button onClick={handleReply} className="archive">reply</button>
                            <button onClick={handleDelete} className="archive">del</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PitchComment;