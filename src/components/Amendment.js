import React from "react";
import "./Amendment.css";
import { getAuth } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import {db} from "./firebaseConfig";
import DOMPurify from "dompurify";


function Amendment ({amendmentData, triggerUpdate}) {

const auth = getAuth();

const handleAmendAccept = async () => {
    const amendRef = doc(db, 'amendments', amendmentData.docId);
    await updateDoc(amendRef, {status: true});
    triggerUpdate();
}

const handleAmendDecline = async () => {
    const amendRef = doc(db, 'amendments', amendmentData.docId);
    await updateDoc(amendRef, {status: false});
    triggerUpdate();
}

let cleanAmendment = DOMPurify.sanitize(amendmentData.amendment);

return(
<div className="amendment-box">
    <div className="amendment-head">
        <span className="amendment-username">{amendmentData.user}</span> 
        {amendmentData.status === true ? (<span className="accept"> accepted! </span>):(null)}
        {amendmentData.status === false ? (<span className="decline"> declined! </span>):(null)}
    </div>
    <div>
        <div className="text" dangerouslySetInnerHTML={{ __html: cleanAmendment }}/>
    </div>
    {auth.currentUser && amendmentData.userId === auth.currentUser.uid ? (
    <div>
        <button className={amendmentData.status===true ? ("accepted-button") : ("decision-buttons")}  onClick={handleAmendAccept}>accept</button>
        <button className={amendmentData.status===false ? ("declined-button") : ("decision-buttons")} onClick={handleAmendDecline}>disregard</button>
       
    </div>) : (null)}
</div>
);

} 

export default Amendment;