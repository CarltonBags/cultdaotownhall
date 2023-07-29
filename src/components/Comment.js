import React, {useState} from "react";
import "./Comment.css";
import { updateDoc, doc, addDoc, collection } from "firebase/firestore";
import {db} from "./firebaseConfig";


import { getAuth } from "firebase/auth";

function Comment ({commentData, commentUpdate}) {

const auth=getAuth();

const [isEditing, setIsEditing] = useState(false);
const [newComment, setNewComment] = useState('');
const [isReply, setIsReplying] = useState(false)
const [newReply, setNewReply] = useState("");

    const data= commentData;
    const date= new Date (data.time);
    const formattedMinutes = ("0" + date.getMinutes()).slice(-2); // ensures that minutes are always two digits
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}, ${date.getHours()}:${formattedMinutes}`;

    const handleEdit = () => {
        console.log("handleEdit is rendering");

        if(commentData.userId === auth.currentUser.uid){
            const div = document.createElement('div');
            div.innerHTML = data.comment;
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
        const commentRef = doc(db, 'comments', commentData.docId);
    
        // Update the comment in Firestore
        await updateDoc(commentRef, {comment: newComment});
    
        // Reset state
        setIsEditing(false);
        setNewComment('');
        commentUpdate();
        
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

        await addDoc(collection(db, "comments"), {
            id: data.id,
            //commentId: data.commentId,
            time: dateString,
            comment: newReply,
            user:auth.currentUser.displayName,
            userId: auth.currentUser.uid,
            reply: isReply,
            originuser:data.user
        });

        setIsReplying(false);
        setNewReply("");
        commentUpdate();
    }

    const handleAbortReply = () => {
        setIsReplying(false);
    }





    return(
        <div  >
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
                        <span className="username">{data.user}</span> 
                        <span className="date">{formattedDate}</span>
                    </div>
                    {data.reply && <p className="replying">Reply @{data.user}</p>}
                    <div>
                        <div className="text" dangerouslySetInnerHTML={{ __html: data.comment }}/>
                        <div className="comment-footer">
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
                        <span className="username">{data.user}</span> 
                        <span className="date">{formattedDate}</span>
                    </div>
                    {data.reply && <p className="replying">Reply @{data.user}</p>}
                    <div>
                        <div className="text" dangerouslySetInnerHTML={{ __html: data.comment }}/>
                        <div className="comment-footer">
                            <button onClick={handleEdit} className="archive">edit</button>
                            <button onClick={handleReply} className="archive">reply</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Comment;