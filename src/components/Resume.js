import React, { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
import { FaSpinner } from 'react-icons/fa'; // Loading spinner
import Sidebar from './Sidebar';

// Set the worker source to the local worker from the package
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;

function Resume() {
  const [projects, setProjects] = useState('');
  const [experience, setExperience] = useState('');
  const [education, setEducation] = useState('');
  const [skills, setSkills] = useState('');
  const [achievements, setAchievements] = useState('');
  const [courses, setCourses] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const [recommendations, setRecommendations] = useState('');

  const extractTextFromPDF = async (file) => {
    const reader = new FileReader();

    reader.onload = async () => {
      const typedArray = new Uint8Array(reader.result);
      const pdf = await pdfjsLib.getDocument(typedArray).promise;
      let text = '';

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items.map((item) => item.str).join(' ');
        text += pageText + ' ';
      }

      extractSections(text);
      setIsSubmitted(true);
    };

    reader.readAsArrayBuffer(file);
  };

  const extractSections = (text) => {
    const educationRegex = /Education\s*([\s\S]*?)(?=\s*Experience\s*|$)/i;
    const experienceRegex = /Experience\s*([\s\S]*?)(?=\s*Projects\s*|$)/i;
    const projectsRegex = /Projects\s*([\s\S]*?)(?=\s*Online Courses and Certifications\s*|$)/i;
    const coursesRegex = /Online Courses and Certifications\s*([\s\S]*?)(?=\s*Skills\s*|$)/i;
    const skillsRegex = /(?:Skills|Technical Skills|Programming Skills|Languages)\s*([\s\S]*?)(?=\s*Achievements\s*|$)/i;
    const achievementsRegex = /Achievements\s*([\s\S]*?)(?=$)/i;

    setEducation(text.match(educationRegex)?.[1]?.trim() || 'Education not found');
    setExperience(text.match(experienceRegex)?.[1]?.trim() || 'Experience not found');
    setProjects(text.match(projectsRegex)?.[1]?.trim() || 'Projects not found');
    setCourses(text.match(coursesRegex)?.[1]?.trim() || 'Online Courses not found');
    setSkills(text.match(skillsRegex)?.[1]?.trim() || 'Skills not found');
    setAchievements(text.match(achievementsRegex)?.[1]?.trim() || 'Achievements not found');
  };

  const handleGetRecommendations = () => {
    const resumeData = {
      experience,
      projects,
      skills,
      courses,
    };

    setLoading(true); // Show loading spinner

    fetch('http://127.0.0.1:5000/get-recommendations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ resume_data: resumeData }),
    })
      .then((response) => response.json())
      .then((data) => {
        setRecommendations(data.recommendations);
        setLoading(false); 
      })
      .catch((error) => {
        console.error('Error fetching recommendations:', error);
        setLoading(false); 
        setRecommendations("Sorry Error Happened")
      });
  };

  return (

    <div className=''>

      <Sidebar/>
      <div id="main" className="bg-white rounded-3xl items-center mt-14  shadow-md p-8 flex flex-col border-x-2 border-y-2 border-blue-900 ml-96 mx-60 my-6">
      <h1 className="text-3xl font-bold text-blue-900 mb-4 font-mono">PDF Text Extraction</h1>
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => extractTextFromPDF(e.target.files[0])}
        className="mb-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {isSubmitted && (
        <div className="overflow-y-auto h-96 w-full">
          <h2 className="text-xl font-semibold text-blue-900 mb-6">Education</h2>
          <pre className="whitespace-pre-wrap border rounded-lg p-4 border-gray-300 bg-gray-50 mb-4 text-sm font-normal">{education}</pre>
          <h2 className="text-xl font-semibold text-blue-900 mb-6">Experience</h2>
          <pre className="whitespace-pre-wrap border rounded-lg p-4 border-gray-300 bg-gray-50 mb-4 text-sm font-normal">{experience}</pre>
          <h2 className="text-xl font-semibold text-blue-900 mb-6">Projects</h2>
          <pre className="whitespace-pre-wrap border rounded-lg p-4 border-gray-300 bg-gray-50 mb-4 text-sm font-normal">{projects}</pre>
          <h2 className="text-xl font-semibold text-blue-900 mb-6">Online Courses and Certifications</h2>
          <pre className="whitespace-pre-wrap border rounded-lg p-4 border-gray-300 bg-gray-50 mb-4 text-sm font-normal">{courses}</pre>
          <h2 className="text-xl font-semibold text-blue-900 mb-6">Skills</h2>
          <pre className="whitespace-pre-wrap border rounded-lg p-4 border-gray-300 bg-gray-50 mb-4 text-sm font-normal">{skills}</pre>
          <h2 className="text-xl font-semibold text-blue-900 mb-6">Achievements</h2>
          <pre className="whitespace-pre-wrap border rounded-lg p-4 border-gray-300 bg-gray-50 text-sm font-normal">{achievements}</pre>

          {/* Get Recommendations Button */}
          <button
            onClick={handleGetRecommendations}
            className="mt-6 bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-700"
          >
            Get Recommendations
          </button>

          {/* Display loading animation */}
          {loading && (
            <div className="flex justify-center items-center mt-4">
              <FaSpinner className="animate-spin text-blue-500 text-3xl" />
              <span className="ml-2 text-blue-700 text-lg">Fetching recommendations...</span>
            </div>
          )}
        </div>
      )}

      {recommendations && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">Recommendations</h2>
          <pre className="whitespace-pre-wrap border rounded-lg p-4 border-gray-300 bg-gray-50 text-sm font-normal">
            {recommendations}
          </pre>
        </div>
      )}
    </div>

    </div>
  
  );
}

export default Resume;
