import React, { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
import Tesseract from 'tesseract.js';

// Set the worker source to the local worker from the package
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;

function Pdf_Extract() {
  const [pdfText, setPdfText] = useState('');
  const [education, setEducation] = useState('');
  const [skills, setSkills] = useState('');
  const [experience, setExperience] = useState('');
  const [projects, setProjects] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const extractTextFromPDF = async (file) => {
    setIsLoading(true);
    const reader = new FileReader();

    reader.onload = async () => {
      const typedArray = new Uint8Array(reader.result);
      const pdf = await pdfjsLib.getDocument(typedArray).promise;
      let images = [];

      // Extract images from each page of the PDF
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2.0 });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({ canvasContext: context, viewport }).promise;
        const imgData = canvas.toDataURL('image/png');
        images.push(imgData);
      }

      // Use Tesseract to perform OCR on each image extracted from PDF
      let extractedText = '';
      for (const image of images) {
        const ocrResult = await Tesseract.recognize(image, 'eng', {
          logger: (m) => console.log(m), // Optional logging
        });
        extractedText += ocrResult.data.text + ' ';
      }

      setPdfText(extractedText.trim());
      extractSections(extractedText.trim());
      setIsLoading(false);
    };

    reader.readAsArrayBuffer(file);
  };

  const extractSections = (text) => {
    // Define more robust regex patterns for each section
    const educationRegex = /(?:EDUCATION|Education)\s*[:\-]?\s*(.*?)(?=\b(?:SKILLS|EXPERIENCE|PROJECT|CERTIFICATIONS|ACHIEVEMENTS)\b|$)/is;
    const skillsRegex = /(?:SKILLS|Skills|Technical Skills)\s*[:\-]?\s*(.*?)(?=\b(?:EDUCATION|EXPERIENCE|PROJECT|CERTIFICATIONS|ACHIEVEMENTS)\b|$)/is;
    const experienceRegex = /(?:EXPERIENCE|Experience|Professional Experience)\s*[:\-]?\s*(.*?)(?=\b(?:EDUCATION|SKILLS|PROJECT|CERTIFICATIONS|ACHIEVEMENTS)\b|$)/is;
    const projectsRegex = /(?:PROJECT|Projects?|Project Experience)\s*[:\-]?\s*(.*?)(?=\b(?:EDUCATION|SKILLS|EXPERIENCE|CERTIFICATIONS|ACHIEVEMENTS)\b|$)/is;

    // Extract sections using regex patterns
    const educationMatch = text.match(educationRegex);
    const skillsMatch = text.match(skillsRegex);
    const experienceMatch = text.match(experienceRegex);
    const projectsMatch = text.match(projectsRegex);

    setEducation(educationMatch ? educationMatch[1].trim() : 'Education not found');
    setSkills(skillsMatch ? skillsMatch[1].trim() : 'Skills not found');
    setExperience(experienceMatch ? experienceMatch[1].trim() : 'Experience not found');
    setProjects(projectsMatch ? projectsMatch[1].trim() : 'Projects not found');
  };

  return (
    <div className="items-center text-2xl mx-auto">
      <h1>PDF Text Extraction with OCR</h1>
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => extractTextFromPDF(e.target.files[0])}
      />
      {isLoading ? <p>Loading and extracting text...</p> : null}
      <h2>Extracted Text:</h2>
      <pre>{pdfText}</pre>
      <h2>Education</h2>
      <pre>{education}</pre>
      <h2>Skills</h2>
      <pre>{skills}</pre>
      <h2>Experience</h2>
      <pre>{experience}</pre>
      <h2>Projects</h2>
      <pre>{projects}</pre>
    </div>
  );
}

export default Pdf_Extract;
