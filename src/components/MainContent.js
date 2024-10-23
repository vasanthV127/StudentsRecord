import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faMicrophoneSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { FaRobot } from "react-icons/fa"; // Import the robot icon from react-icons
import RoleSelection from "./RoleSelection";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import "./MainContent.css";
import Sidebar from "./Sidebar";

// Register required components for Chart.js
Chart.register(ArcElement, Tooltip, Legend);

const MainContent = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [message, setMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState([{ sender: "Bot", text: "Hello! User, can we start our Interview?" }]);
  const [interviewOver, setInterviewOver] = useState(false);
  const [checkResults, setCheckResults] = useState(null);
  const [responses, setResponses] = useState([]);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSpeechToText = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in this browser. Please use Chrome.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("");
      setMessage(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => setIsListening(false);

    isListening ? recognition.stop() : recognition.start();
  };

  const handleSendMessage = () => {
    if (message.trim() && selectedRole) {
      const newUserMessage = { sender: "User", text: message };
      setMessages((prevMessages) => [...prevMessages, newUserMessage]);
      setResponses((prevResponses) => [...prevResponses, message]);

      axios
        .post("http://127.0.0.1:5000/generate_questions", {
          user_id: "user_1",
          message_content: message,
          position: [selectedRole],
        })
        .then((response) => {
          const botMessage = response.data.question;
          setMessages((prevMessages) => [...prevMessages, { sender: "Bot", text: botMessage }]);

          if (botMessage.includes("Thank you, your interview is over")) {
            setInterviewOver(true);
          }
        })
        .catch((error) => {
          console.error("Error fetching response from Flask:", error);
          setMessages((prevMessages) => [...prevMessages, { sender: "Bot", text: "Sorry, something went wrong." }]);
        });

      setMessage(""); // Clear input field
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const handleEvaluateAnswers = () => {
    axios
      .post("http://127.0.0.1:5000/evaluate_answers", { user_responses: responses })
      .then((response) => {
        setCheckResults(response.data);
        setInterviewOver(true);
      })
      .catch((error) => console.error("Error evaluating answers:", error));
  };

  if (!selectedRole) {
    return <RoleSelection onSelectRole={handleRoleSelect} />;
  }
  const chartData = checkResults
    ? {
        labels: ["Accuracy", "Clarity", "Conciseness", "Depth", "Relevance"],
        datasets: [{
          label: "Interview Results",
          data: [
            checkResults.averages.Accuracy,
            checkResults.averages.Clarity,
            checkResults.averages.Conciseness,
            checkResults.averages.Depth,
            checkResults.averages.Relevance,
          ],
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
        }],
      }
    : null;

  return (

    <div className="flex">


      <Sidebar/>

      <div className="main-content bg-gradient-to-r border-t-2 min-h-screen flex justify-center items-center ml-64 p-4">
      <div className="chat-container bg-white p-9 border-x-2 border-y-2 border-blue-900 border-2 rounded-3xl shadow-lg w-full h-full">
        <div className="messages-container h-5/6 mb-9 overflow-y-auto border border-gray-300 rounded-lg bg-gray-50 p-4 shadow-inner" ref={chatContainerRef}>
          {messages.map((msg, index) => (
            <div key={index} className={`mb-4 p-3 flex items-center ${msg.sender === "Bot" ? "message-bot" : "message-user"}`}>
              {msg.sender === "Bot" && (
                <FaRobot className="text-2xl text-blue-500 mr-2" /> // Inbuilt bot icon
              )}
              <span><strong>{msg.sender === "User" ? "User" : ""}</strong> {msg.text}</span>
            </div>
          ))}
        </div>

        <div className="input-area flex items-center space-x-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Type your message..."
          />
          <button
            onClick={handleSpeechToText}
            className={`p-4 rounded-2xl transition duration-200 ${isListening ? "bg-red-600 text-white" : "bg-blue-600 text-white"} hover:bg-opacity-80`}
          >
            <FontAwesomeIcon icon={isListening ? faMicrophoneSlash : faMicrophone} />
          </button>
          <button
            onClick={handleSendMessage}
            className="p-4 bg-blue-600 text-white rounded-2xl transition duration-200 hover:bg-blue-700"
          >
            <span className="font-bold">Send</span>
          </button>
        </div>

        <div className="text-center mt-4">
          {interviewOver ? (
            <button onClick={handleEvaluateAnswers} className="px-6 py-3 bg-purple-600 text-white rounded-xl transition duration-200 hover:bg-purple-700">
              View Results
            </button>
          ) : (
            <button onClick={handleEvaluateAnswers} className="px-6 py-3 bg-red-600 text-white rounded-xl transition duration-200 hover:bg-red-700">
              Stop Interview and Evaluate
            </button>
          )}
        </div>

        {checkResults && (
          <div className="mt-8 flex justify-center items-center">
          <div className="w-64 h-64">
            <Pie data={chartData} />
          </div>
        </div>
        
        )}
      </div>
    </div>



    </div>
    
  );
};

export default MainContent;
