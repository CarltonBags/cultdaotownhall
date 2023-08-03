import { query, doc, updateDoc, addDoc, getDocs, getDoc, collection, where } from "firebase/firestore";
import React, {useState, useEffect} from "react";
import { getAuth } from "firebase/auth";
import {useParams} from "react-router-dom";
import {db} from "./firebaseConfig";
import "./ProposalPage.css";
import SubmitComment from "./SubmitComment";
import Comment from "./Comment";
import Amendment from "./Amendment";
import { debounce } from 'lodash';
import DOMPurify from "dompurify";





function ProposalPage () {

    let {docId} = useParams();
    let auth = getAuth();
    console.log(docId); // Add this line

    let [proposalData, setProposalData] = useState([]);
    let [commentData, setCommentData] = useState([]);
    let [commentAdded, setCommentAdded] = useState(false);
    let [amending, setAmending] = useState(false);
    let [newAmendment, setNewAmendment] = useState("");
    let [amendmentData, setAmendmentData] = useState([]);
    let [editProposal, setEditProposal] =useState(false);
    let [proposalDes, setProposalDes] = useState("")
    let [updateAmend, setUpdateAmend] = useState(false);
    const [debouncedValue, setDebouncedValue] = useState('');
    let [proposalUpdate, setProposalUpdate] = useState(false);


    const debouncedSave = debounce((nextValue) => {
        setDebouncedValue(nextValue);
      }, 1000); // Wait 500ms before considering the input value "settled"
    
      useEffect(() => {
  
        debouncedSave(proposalDes);
      }, [proposalDes, debouncedSave]); 

    
    const triggerUpdate= () => {
        setUpdateAmend(!updateAmend)
    }

    const triggerProposalUpdate= () => {
        setProposalUpdate(!proposalUpdate);
    }

    useEffect (() => {
        const fetchProposalData = async () => {
            console.log(docId);
            const docRef = doc(db, "proposals", docId);
            const docSnap = await getDoc(docRef);
    
            if (docSnap.exists()) {
                const data = { ...docSnap.data(), docId: docSnap.id };
                setProposalData(data);
                setProposalDes(data.description);  // update proposalDes here

            } else {
                console.log('No such document!');
            }
        }
        fetchProposalData();
    }, [docId, proposalUpdate]);
    
    

    useEffect (() => {
            const fetchCommentData = async () => {
            const q = query(collection(db, "comments"), where("id", "==", docId));
            const querySnapshot= await getDocs(q);

            const tempCommentData = [];
            querySnapshot.forEach((doc) => {
                tempCommentData.push({...doc.data(),
                    docId: doc.id
                });
            });

                tempCommentData.sort((a, b) => new Date(a.time) - new Date(b.time));


            setCommentData(tempCommentData);
        }

        fetchCommentData();

    }, [commentAdded, docId]);


    const commentUpdate = () =>{
        setCommentAdded(!commentAdded);
    };



    const {title, description} = proposalData;

    const handleAmend = () => {
        setAmending(true);
        triggerUpdate();
    }

    const handleAmendAbort = () => {
        setAmending(false)
        triggerUpdate();
    }

    const handleAmendSubmit = async () => {
        const date = new Date();
        const dateString = date.toISOString();

        await addDoc(collection(db, "amendments"), {
            id: proposalData.docId,
            time: dateString,
            amendment: newAmendment,
            user:auth.currentUser.displayName,
            userId: auth.currentUser.uid,
            amending: amending,
            status: null
        });

        setAmending(false);
        setNewAmendment("")
        triggerUpdate();
    }

    useEffect (() => {
        const fetchAmendmentData = async () => {
        const q = query(collection(db, "amendments"), where("id", "==", docId));
        const querySnapshot= await getDocs(q);

        const tempAmendmentData = [];
        querySnapshot.forEach((doc) => {
            tempAmendmentData.push({...doc.data(),
                docId: doc.id
            });
        });

            tempAmendmentData.sort((a, b) => new Date(a.time) - new Date(b.time));


        setAmendmentData(tempAmendmentData);
    }

    fetchAmendmentData();

    }, [docId, updateAmend, proposalData.docId]);

    const handleEditProposal = () => {
        setEditProposal(true);
        
    }

    const handleEditAbortProposal = () => {
        setEditProposal(false);
    }

    const handleSubmitEditProposal = async () => {

        if (!proposalData) {
            console.error('No docId found for proposal data:', proposalData);
            return;
          }
        const proposalRef = doc(db, 'proposals', proposalData.docId);
        await updateDoc(proposalRef, {description: debouncedValue, isEdited: true});

        setEditProposal(false);
        setProposalDes("");
        triggerProposalUpdate();
    }

    let cleanDescription = DOMPurify.sanitize(description);
    
    if (!proposalData) {

    return <div className="revoloading">Revoloading...</div>;
    }

    return (
        <div className="container">
            <div>
            <div className="sub-container">
                <h1 className="headline">- CIM-{proposalData.id} -</h1>
                <h1 className="sub-headline">{title}</h1>
                {editProposal ? 
                    (<div>
                        <textarea value={proposalDes} onChange={(e) => {setProposalDes(e.target.value)}} className="proposal-edit"/>
                         <div>
                            <button className="btn btn-dark edit" onClick={handleSubmitEditProposal}>submit</button>
                            <button className="btn btn-dark edit" onClick={handleEditAbortProposal}>abort</button>
                         </div>
                    </div>
                 ) : (
                     <div className="description" dangerouslySetInnerHTML={{ __html: cleanDescription}} />)}
                     <div className="proposalfooter"> </div>               
                    <div className="proposalfooter">
                         <a href="https://snapshot.org/#/cultdaoart.eth/create" className="amendment-buttons snap" target="_blank" rel="noopener noreferrer">snap</a>
                          {proposalData.userId && auth.currentUser.uid ? (<button onClick={handleEditProposal} className="amendment-buttons">edit</button>) : (null)}
                     { !amending ? 
                     (
                         <button className="amendment-buttons" onClick={handleAmend}>amend</button>): (null)}
                    </div>
                    
                { amending ?
                (<div>
                     <h3 className="sub-headline">request amendment</h3>
                        <div>
                         <textarea className="amendment" value= {newAmendment} onChange={event => setNewAmendment(event.target.value)}/>
                        </div>
                            <div className="amendment-buttons">
                             <button className= "btn btn-dark edit" onClick={handleAmendSubmit}>amend</button>
                            <button className= "btn btn-dark edit" onClick={handleAmendAbort}>abort</button>
                            </div>
                </div>) : null}
            </div>
                { !amendmentData.length > 0 ? (null) : (<div> 
                <div>
                 <h1 className="discussion-headline">- Amendment Requests -</h1>
                 </div>
                    {amendmentData.map((amendmentData) => <div key={amendmentData.docId}> <Amendment triggerUpdate={triggerUpdate} amendmentData= {amendmentData}/> </div>)}
                </div>)}
                <h1 className="discussion-headline">- Discussion -</h1>
                {commentData.map((commentData) => (<div key={commentData.docId}><Comment commentUpdate={commentUpdate} commentData={commentData}/> </div>))}
                <SubmitComment commentUpdate={commentUpdate} proposalData={proposalData} />
                </div>
        </div>

    );
}

export default ProposalPage;