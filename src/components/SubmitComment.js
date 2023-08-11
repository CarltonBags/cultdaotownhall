import React, {useState, useEffect} from "react";
import {db} from "./firebaseConfig";
import ReactQuill from "react-quill";
import { addDoc, collection } from "firebase/firestore";
import "./SubmitComment.css";
import { getAuth } from "firebase/auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDroplet } from '@fortawesome/free-solid-svg-icons';



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

        if (!comment.length > 0){
            alert("Comments cannot be empty");
            return;
        }
        const date = new Date();
        const dateString = date.toISOString();

        await addDoc(collection(db, "comments"), {
            id: data.docId,
            time: dateString,
            comment: comment,
            user:auth.currentUser.displayName,
            userId:auth.currentUser.uid
        });

        commentUpdate();
        setComment("");
    }


    const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);

    // Update the state on window resize
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 900);
        }

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    return (
        <div>
            <form onSubmit={postComment}>
                { isMobile ? 
                    <div className="mobile-comment-container">
                        <input 
                            className="comment-mobile"
                            type="text"
                            name="comment"
                            value={comment}
                            onChange={e => handleInputChange(e.target.value)}
                        /> 
                        <button className="btn-submit-mobile" type="submit">
                            <FontAwesomeIcon icon={faDroplet} style={{color: "#eb1e1e"}} />
                        </button>
                    </div>
                    : 
                    <ReactQuill 
                        className="comment"
                        type="text"
                        name="comment"
                        value={comment}
                        onChange={handleInputChange}
                    />
                }
                {!isMobile && 
                    <p>
                        <input className="btn btn-danger" type="submit" value="Submit"/>
                    </p>
                }
            </form>
        </div>
    );
    
}
export default SubmitComment;