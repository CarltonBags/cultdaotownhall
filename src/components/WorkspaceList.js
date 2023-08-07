import React, {useState, useEffect} from "react";
import { collection, getDocs } from "firebase/firestore";
import {db} from "./firebaseConfig";
import ProposalCard from "./ProposalCard";
import "./ProposalList.css";
import { useNavigate} from "react-router-dom";
import WorkspaceCard from "./WorkspaceCard";




function ProposalList () {

    const navigate = useNavigate();
    const [proposalInfo, setProposalInfo] = useState ([]);


/*useEffect (()=> {

    const fetchProposalData = async () => {
        // fetch the documents in the collection
        const querySnapshot = await getDocs(collection(db, "proposals"));
    
        // Process the retrieved docs
        let tempProposalInfo = []; // create a temporary array to hold proposal data
        querySnapshot.forEach((doc) => {
            // Access the document data
            const data = doc.data();
    
            // Do something with the data
            tempProposalInfo.push({
                docId: doc.id,
                ...data, // spread the data object
            });
        });
        // Update the state with all fetched data
        setProposalInfo(tempProposalInfo);
    }
    
    fetchProposalData();
    }, []);
    
    if (!proposalInfo) {
        return (<div> Revoloading...</div>)
    }
*/
    const handleClick = (proposalInfo) => {
        navigate(`/proposalList/proposalPage/${proposalInfo.docId}` ,{ state: { proposalInfo} })
        }

    return (
        <div>
        <div><h1 className="pl-header">SubDAO Workspaces</h1></div>
        <WorkspaceCard />
        {/*<div className="proposal-list" >
            {proposalInfo.map((proposal) => (
        <div key={proposal.docId} onClick={() => handleClick(proposal)}>
            <ProposalCard proposal={proposal}/>
         </div>
            ))}  
        </div>*/}
        </div>
        

    );

}


export default ProposalList;