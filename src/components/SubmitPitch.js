import { getDocs, addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "./firebaseConfig";
import "./SubmitProposal.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

function SubmitPitch() {
  const auth = getAuth();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [socials, setSocials] = useState("");
  const [investment, setInvestment] = useState("");
  const [logo, setLogo] = useState(null);

  const handleLogoChange = async (event) => {
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
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  const handleInvestmentChange = (value) => {
    setInvestment(value);
  };

  const handleSocialChange = (event) => {
    setSocials(event.target.value);
  };

  const postPitch = async (event) => {
    event.preventDefault();

    if (!auth.currentUser) {
      alert("You need to be logged in to post a Project.");
      return;
    }

    let highestId = 0;
    let logoURL = null;

    if (logo) {
      const storage = getStorage();
      const storageRef = ref(storage, "logos/" + logo.name);
      try {
        await uploadBytes(storageRef, logo);
        // Step 2: Get the download URL of the uploaded logo
        logoURL = await getDownloadURL(storageRef);
      } catch (error) {
        console.error("Error uploading logo:", error);
      }
    }

    const querySnapshot = await getDocs(collection(db, "pitches"));
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.id && data.id > highestId) {
        highestId = data.id;
      }
    });

    const date = new Date();
    const dateString = date.toISOString();

    // Check if logoURL is null and avoid storing it as a string "null"
    const pitchData = {
      name: name,
      socials: socials,
      description: description,
      investment: investment,
      id: highestId + 1,
      time: dateString,
      user: auth.currentUser.displayName,
    };

    if (logoURL !== null) {
      pitchData.logo = logoURL;
    }

    await addDoc(collection(db, "pitches"), pitchData);

    setName("");
    setDescription("");
    setSocials("");
    setInvestment("");
    setLogo(null);
  };

  return (
    <div className="proposal-container">
      <h1 className="proposal-headline">Submit Your Project</h1>
      <form onSubmit={postPitch}>
        <div className="label-container">
          <label className="sub-head">- What is the Name of your Project? -</label>
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
              onChange={handleDescriptionChange}
            />
          </div>
        </div>
        <div className="label-container">
          <label className="sub-head">
            - Describe your desired conditions for the Investment (What do you need? What will you return?) -
          </label>
          <ReactQuill
            type="text"
            name="investment"
            onChange={handleInvestmentChange}
            value={investment}
          />
        </div>
        <div className="label-container">
          <label className="sub-head">- Project Logo -</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoChange}
          />
        </div>
        <input className="btn btn-dark submit-pitch" type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default SubmitPitch;
