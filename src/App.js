import { BrowserRouter as Router, Route, Routes,Link } from "react-router-dom";

import InterviewBotPage from "./components/InterviewBotPage";
import Resume from "./components/Resume";
import Assistance from "./components/Assistance";
import VocalAssistance from "./components/VocalAssistance";
import SuccessStory from "./components/SuccessStory";
import Sidebar from "./components/Sidebar";
import Results from "./components/Results"; 

import Register from "./components/LoginComponents/Register";
import Login from "./components/LoginComponents/Login";
const App = () => {
  return (
    // <Router>
    //    <Sidebar/>
    //    <Routes>
    //    <Route path="/practice" element = {<InterviewBotPage/>}/>
    //      <Route path="/resume" element={<Resume/>} />
    //    <Route path="/test" element={<Assistance/>} />
    //    <Route path="/vocal-assistance" element={<VocalAssistance/>} />
    //    <Route path="/success-story" element={<SuccessStory/>} />
    //     <Route path="/results" element={<Results/>} />
       

    //    </Routes>
    //  </Router>

  //   <Router>
  //   <div className="flex flex-col items-center min-h-screen bg-gray-50">
  //     <h1 className="my-8 text-4xl font-bold text-gray-800">Welcome to Intrain Tech</h1>
  //     <nav className="mb-8">
  //       <ul className="flex space-x-6">
  //         <li>
  //           <Link
  //             to="/register"
  //             className="text-blue-600 hover:text-blue-800 font-semibold"
  //           >
  //             Register
  //           </Link>
  //         </li>
  //         <li>
  //           <Link
  //             to="/login"
  //             className="text-blue-600 hover:text-blue-800 font-semibold"
  //           >
  //             Login
  //           </Link>
  //         </li>
  //       </ul>
  //     </nav>
  //     <Routes>
  //       <Route path="/register" element={<Register />} />
  //       <Route path="/login" element={<Login />} />
  //     </Routes>
  //   </div>
  // </Router>


  <Router><Routes>
  <Route path="/login" element={<Login />} />
  <Route path="/" element={<Login />} />
  
  <Route path="/register" element={<Register />} />
  {/* InterviewBot Page and its sub-routes */}
  <Route path="/home" element={<InterviewBotPage />} />
  <Route path="/practice" element={<InterviewBotPage />} />
  <Route path="/resume" element={<Resume />} />
  <Route path="/test" element={<Assistance />} />
  <Route path="/vocal-assistance" element={<VocalAssistance />} />
  <Route path="/success-story" element={<SuccessStory />} />
  <Route path="/results" element={<Results />} />
</Routes></Router>
  
  );
};

export default App;
