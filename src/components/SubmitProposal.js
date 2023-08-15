import { getDocs, addDoc, collection } from "firebase/firestore";
import React, {useState} from "react";
import {db} from "./firebaseConfig";
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
    const [authors, setAuthors] = useState("");
    const [category, setCategory] = useState("");


    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    }

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }

    const handleDescriptionChange = (value) => {
        setDescription(value);
    }
    const handleAuthorChange = (event) => {
        setAuthors(event.target.value);
    }

    const postData = async (event) => {
        event.preventDefault();

        if (!auth.currentUser) {
            alert('You need to be logged in to post a proposal.');
            return;
        }

        if (!title > 0 || !description > 0 || !authors > 0) {
            alert("all input fields must contain an input");
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
            authors: authors,
            category: category,
            id: highestId + 1,
            time: dateString,
            user: auth.currentUser.displayName,
            userId: auth.currentUser.uid,
            isEdited: null
        });
                    
        setTitle("");
        setDescription("");
        setAuthors("");
        navigate("/proposalList");
    }

    return (
        <div className="pr-container">
            <h1 className="proposal-headline">Submit Motion</h1>
            <form onSubmit={postData}>
             <div className="label-container">
                    <label className="sub-head">- Category -</label>
                    <select className="pr-input" value={category} onChange={handleCategoryChange}>
                        <option value="">Select a category</option>
                        <option value="Governance">Governance</option>
                        <option value="ModulusZK">ModulusZK</option>
                        <option value="Letter">Open Letter</option>
                        <option value="Other">Other</option>
                    </select>
                    </div>
                <div className="label-container">
                    <label className="sub-head">- Title -</label>
                    <input
                        className="pr-input"
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
                <div className="label-container">
                    <label className="sub-head">- Authors -</label>
                    <input
                        className="pr-input"
                        type="text"
                        name="Authors"
                        onChange={handleAuthorChange}
                        value={authors}
                    />
                </div>
                <input className="btn btn-danger" type="submit" value="Submit"/>
            </form>
        </div>
    );
}

export default SubmitProposal;
