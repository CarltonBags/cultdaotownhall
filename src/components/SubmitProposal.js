import { getDocs, addDoc, collection } from "firebase/firestore";
import React, {useState} from "react";
import {db, app} from "./firebaseConfig";
import "./SubmitProposal.css";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import { getAuth } from "firebase/auth";
import {useNavigate} from "react-router-dom";



function SubmitProposal () {

    const auth = getAuth();
    const navigate = useNavigate();


    const [title, setTitle] = useState ("");
    const [description, setDescription] = useState("");

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }

    const handleDescriptionChange = (value) => {
        setDescription(value);
    }

    const postData = async (event) => {
        event.preventDefault();

        if (!auth.currentUser) {
            alert('You need to be logged in to post a proposal.');
            return;
        }

        let highestId = 0;

        const querySnapshot = await getDocs(collection(db, "proposals"));
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            if (data.id && data.id > highestId) {
                highestId = data.id;
            }
        });

        const date = new Date();
        const dateString = date.toISOString();

        await addDoc(collection(db, "proposals"), {
            title: title,
            description: description,
            id: highestId + 1,
            time: dateString,
            user: auth.currentUser.displayName
        });
                    
        setTitle("");
        setDescription("");

        navigate("/");
    }

    return (
        <div className="proposal-container">
            <h1 className="proposal-headline">Submit Proposal</h1>
            <form onSubmit={postData}>
                <div className="label-container">
                    <label className="sub-head">- Title -</label>
                    <input
                        type="text"
                        name="Title"
                        onChange={handleTitleChange}
                        value={title}
                    />
                </div>
                <div className="label-container">
                    <label className="sub-head">- Description -</label>
                    <div className="quill-wrapper">
                    <ReactQuill
                        className="description"
                        type="text"
                        name="Description"
                        value={description}
                        onChange={handleDescriptionChange}
                    />
                    </div>
                </div>
                <input className="btn btn-dark" type="submit" value="Submit"/>
            </form>
        </div>
    );
}

export default SubmitProposal;
