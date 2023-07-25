import React, {useState} from "react";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import SubmitProposal from "./components/SubmitProposal";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ProposalList from "./components/ProposalList";
import ProposalPage from "./components/ProposalPage";
import Login from "./components/Login";
import Register from "./components/Register";
import Footer from "./components/Footer";
import SubmitPitch from "./components/SubmitPitch";
import PitchList from "./components/PitchList";
import PitchPage from "./components/PitchPage";
import File from "./components/File";









function App() {


  const [submitOpen, setSubmit] = useState (false);
  const [enterOpen, setEnterOpen] = useState (false);
  const [proposalOpen, setProposalOpen] = useState (false)
  const [loginOpen, setLoginOpen] = useState (false);
  const [registerOpen, setRegisterOpen] = useState (false);


  const handleSubmitOpen = () => {
    setSubmit(true)
    console.log("submitOpen:", submitOpen); // Add this line
  };

  const handleSubmitClose = () => {
    setSubmit(false)
  };

  const handleEnterOpen = () => {
    setEnterOpen(true)
  }

  const handleEnterClose = () => {
    setEnterOpen(false)
  }

  const handleBrandClick= () => {
    setSubmit(false);
    setEnterOpen(false);    
    setProposalOpen(false);
    setLoginOpen(false);
    setRegisterOpen(false);

  }

  const handleProposalClick = () => {
    setProposalOpen(true);
    setSubmit(false);
    setEnterOpen(false); 
    setLoginOpen(false);
    setRegisterOpen(false);

  }

  const handleLoginClick = () => {
    setProposalOpen(false);
    setSubmit(false);
    setEnterOpen(false); 
    setLoginOpen(true);
    setRegisterOpen(false);

  }

  const handleRegisterClick = () => {
    setProposalOpen(false);
    setSubmit(false);
    setEnterOpen(false); 
    setLoginOpen(false);
    setRegisterOpen(true);
  }


  

  return (
    <div>
<Router>
  <Navbar />
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/submit" element={<SubmitProposal />} />
    <Route path="/proposalList" element={<ProposalList handleProposalClick={handleProposalClick}/>} />
    <Route path="proposalList/proposalPage/:id" element={<ProposalPage handleProposalClick={handleProposalClick}/>} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/submitPitch" element={<SubmitPitch />} />
    <Route path="/pitchList" element={<PitchList />} />
    <Route path="/pitchList/pitchPage/:id" element={<PitchPage />} />
    <Route path="/pitchList/pitchPage/:id/file" element={<File />} />

  </Routes>
  <Footer />
</Router>

    </div>
);

}

export default App;
