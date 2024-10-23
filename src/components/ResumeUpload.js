import React, { useState } from "react";
import axios from "axios";
import "./ResumeUpload.css";
import Sidebar from "./Sidebar";
const ResumeUpload = ({ onUploadComplete }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  const [userId] = useState("user_1"); // Static user ID; you can modify as needed

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      setUploadStatus("Please select a file before uploading.");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const resumeText = e.target.result;

      try {
        const response = await axios.post("http://127.0.0.1:5000/summarize-resume", {
          user_id: userId,
          resume_data: resumeText,
        });

        if (response.data && response.data.resume_data) {
          setSummary(response.data.resume_data);
          setUploadStatus("Resume summarized successfully.");
          onUploadComplete(); // Notify parent that upload is complete
        } else {
          setUploadStatus("Failed to summarize resume. Try again.");
        }
      } catch (error) {
        console.error("Error summarizing resume:", error);
        setUploadStatus("Error during upload. Please try again.");
      }
    };

    reader.readAsText(selectedFile);
  };

  return (
    
    <div className="flex">

      <Sidebar/>
      <div className="flex justify-center items-center mt-24 ml-72">
      <div id="main" className="bg-white w-full max-w-md rounded-3xl shadow-md p-6 border border-blue-900">
        <h1 className="text-3xl font-bold text-center text-blue-900 mb-6">Upload Your Resume</h1>
        <input
          type="file"
          accept=".pdf,.doc,.docx,.txt"
          onChange={handleFileChange}
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full mb-4"
        />
        <button
          onClick={handleUpload}
          className="bg-blue-700 text-white rounded-xl p-3 hover:bg-blue-800 transition duration-200 w-full"
        >
          Upload and Summarize
        </button>

        {/* Display the upload status or summary */}
        {uploadStatus && <p className="text-center mt-4 text-red-600">{uploadStatus}</p>}
        {summary && (
          <div className="summary-container bg-gray-100 p-4 rounded-lg mt-4 border border-gray-300 shadow-inner">
            <h2 className="text-xl font-bold mb-2">Summarized Resume:</h2>
            <p>{summary}</p>
          </div>
        )}
      </div>
    </div>

      
    </div>
  );
};

export default ResumeUpload;
