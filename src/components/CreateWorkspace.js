import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "./firebaseConfig";
import { useNavigate } from "react-router-dom";
import "./SubmitProposal.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getAuth } from "firebase/auth";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

function SubmitPitch() {
  const auth = getAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [socials, setSocials] = useState("");
  const [investment, setInvestment] = useState("");
  //const [logo, setLogo] = useState(null);
  //const [media, setMedia] = useState("");
  const [deck, setDeck] = useState("");


 /* const handleLogoChange = async (event) => {
    const selectedLogo = event.target.files[0];
    const storage = getStorage();
    const storageRef = ref(storage, "logos/" + selectedLogo.name);

    try {
      await uploadBytes(storageRef, selectedLogo);
      const downloadURL = await getDownloadURL(storageRef);
      setLogo(downloadURL);
    } catch (error) {
      console.error("Error uploading logo:", error);
      setLogo(null);
    }
  };*/

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAgendaChange = (value) => {
    setDescription(value);
  };

  const handleInvestmentChange = (value) => {
    setInvestment(value);
  };

  const handleSocialChange = (event) => {
    setSocials(event.target.value);
  };

  const handleDeckChange = (event) => {
    setDeck(event.target.value);
  };

  //const handleMediaChange = (event) => {
  //  setMedia(event.target.value);
  //};

  const postPitch = async (event) => {
    event.preventDefault();

    if (!auth.currentUser) {
      alert("You need to be logged in to post a Project.");
      return;
    }

    //let highestId = 0;
    //let logoURL = null;

   /* if (logo) {
      const storage = getStorage();
      const storageRef = ref(storage, "logos/" + logo.name);
      try {
        await uploadBytes(storageRef, logo);
        // Step 2: Get the download URL of the uploaded logo
        logoURL = await getDownloadURL(storageRef);
      } catch (error) {
        console.error("Error uploading logo:", error);
      }
    }*/

   /* const querySnapshot = await getDocs(collection(db, "pitches"));
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.id && data.id > highestId) {
        highestId = data.id;
      }*/
    //});

    const date = new Date();
    const dateString = date.toISOString();

    // Check if logoURL is null and avoid storing it as a string "null"
    const pitchData = {
      name: name,
      socials: socials,
      description: description,
      investment: investment,
      //id: highestId + 1,
      time: dateString,
      user: auth.currentUser.displayName,
      deck: deck
      //media: media
    };

   // if (logoURL !== null) {
    //  pitchData.logo = logoURL;
   // }

    await addDoc(collection(db, "pitches"), pitchData);
    
    toast.success("your pitch has been successfully submitted!")

    setName("");
    setDescription("");
    setSocials("");
    setInvestment("");
    //setLogo(null);
    setDeck("");

    navigate("/pitchList")
  };

  return (
    <div className="proposal-container">
      <ToastContainer />
      <h1 className="proposal-headline">Create your SubDAO Workspace</h1>
      <form onSubmit={postPitch}>
        <div className="label-container">
          <label className="sub-head">- What is the Name of your Pro? -</label>
          <input
            type="text"
            name="project-name"
            onChange={handleNameChange}
            value={name}
          />
        </div>
        <div className="label-container">
          <label className="sub-head">
            - Please share the Social Handles of your Project as well as Yours -
          </label>
          <input
            type="text"
            name="socials"
            onChange={handleSocialChange}
            value={socials}
          />
        </div>
        <div className="label-container">
          <label className="sub-head">- Describe your Project -</label>
          <div className="quill-wrapper">
            <ReactQuill
              className="description"
              type="text"
              name="description"
              value={description}
              onChange={handleAgendaChange}
            />
          </div>
        </div>
        <div className="label-container">
          <label className="sub-head">
            - Describe your desired conditions for the Investment -
          </label>
          <div className="quill-wrapper">
          <ReactQuill
            className="description"
            type="text"
            name="investment"
            onChange={handleInvestmentChange}
            value={investment}
          />
          </div>
        </div>
        <div className="label-container">
          <label className="sub-head">
            - Do you have a Pitch Deck? Please share the URL -
          </label>
          <input
            type="text"
            name="deck"
            onChange={handleDeckChange}
            value={deck}
          />
        </div>
       {/* <div className="label-container">
          <label className="sub-head">- Project Logo -</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoChange}
          />
  </div>*/}
        <input className="btn btn-dark submit-pitch" type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default SubmitPitch;
