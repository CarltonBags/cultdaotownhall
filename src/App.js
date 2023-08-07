import React from "react";
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
import {VoteProvider} from "./context/VoteContext";
import About from "./components/About";
import AboutPitch from "./components/AboutPitch";
//import WorkspaceList from "./components/WorkspaceList";






function App() {

  return (
    <VoteProvider>
    <div>
<Router>
  <Navbar />
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/submit" element={<SubmitProposal />} />
    <Route path="/proposalList" element={<ProposalList />} />
    <Route path="proposalList/about/" element={<About />} />
    <Route path="proposalList/aboutpitch/" element={<AboutPitch />} />
    <Route path="proposalList/proposalPage/:docId" element={<ProposalPage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/submitPitch" element={<SubmitPitch />} />
    <Route path="/pitchList" element={<PitchList />} />
    <Route path="/pitchList/pitchPage/:docId" element={<PitchPage />} />
    <Route path="/pitchList/pitchPage/:docId/file" element={<File />} />
  </Routes>
  <Footer />
</Router>

    </div>
    </VoteProvider>
);

}

export default App;
