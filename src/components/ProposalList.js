import React, {useState, useEffect} from "react";
import { collection, getDocs } from "firebase/firestore";
import {db} from "./firebaseConfig";
import ProposalCard from "./ProposalCard";
import "./ProposalList.css";
import { useNavigate, useParams} from "react-router-dom";
import { getAuth } from "firebase/auth";




function ProposalList ({handleProposalClick}) {

    const navigate = useNavigate();
    const [proposalInfo, setProposalInfo] = useState ([]);
    const auth = getAuth();


useEffect (()=> {

    const fetchProposalData = async () => {

        try {
            //fetch the documents in the collection
            const querySnapshot = await getDocs(collection(db, "proposals"));

            //Process the retrieved docs
            querySnapshot.forEach((doc) => {
            
                //Access the document data
                const data = doc.data();

                //Do something with the data
            
                setProposalInfo ((prevProposalInfo) => {
                   const exists = prevProposalInfo.some((proposal)=> proposal.id === data.id
                   );
                   return exists ? prevProposalInfo : [...prevProposalInfo, data]
                });
                
            });

        } 
        
        catch (error) { 
            console.error("Error fetching data:", error);

        }
    };

    fetchProposalData();


}, []);
    

    const handleClick = (proposalInfo) => {
        handleProposalClick();
        navigate(`/proposalList/proposalPage/${proposalInfo.id}`)
        }

    return (
        <div>
        <div><h1 className="pl-header">Cult DAO Improvement Proposals</h1></div>
        <div className="proposal-list" >
            {proposalInfo.map((proposal) => (
        <div key={proposal.id} onClick={() => handleClick(proposal)}>
            <ProposalCard proposal={proposal}/>
         </div>
         ))}  
        </div>
        </div>
        

    );

}


export default ProposalList;