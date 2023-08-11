import React, {useState, useEffect} from "react";
import {db} from "./firebaseConfig";
import ReactQuill from "react-quill";
import { addDoc, collection } from "firebase/firestore";
import "./SubmitComment.css";
import { getAuth } from "firebase/auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDroplet } from '@fortawesome/free-solid-svg-icons';






function SubmitPitchComment ({pitchData, triggerUpdate}) {

    const auth = getAuth();
    // eslint-disable-next-line
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

        if (!comment.length > 0){
            alert("Comments cannot be empty");
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
            pitchId: pitchData.id,
            //commentId: highestCommentId +1,
            time: dateString,
            comment: comment,
            userId: auth.currentUser.uid,
            user:auth.currentUser.displayName
        });

        setComment("");

        triggerUpdate();
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
                    <div className="send">
                        <input className="btn btn-danger" type="submit" value="Submit"/>
                    </div>
                }
            </form>
        </div>
    );
}

export default SubmitPitchComment;