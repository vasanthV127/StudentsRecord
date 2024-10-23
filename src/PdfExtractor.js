
import React, { useEffect, useState } from 'react';
import './PdfExtractor.css';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist/legacy/build/pdf';

GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js`;

const PdfExtractor = ({ pdfUrl }) => {
    const [experience, setExperience] = useState('');
    const [projects, setProjects] = useState('');

    const extractTextFromPdf = async (url) => {
        const loadingTask = getDocument(url);
        const pdf = await loadingTask.promise;
        let fullText = '';

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const content = await page.getTextContent();
            const pageText = content.items.map(item => item.str).join(' ');
            fullText += `${pageText}\n`;
        }

        // Extracting sections based on keywords
        extractSections(fullText);
    };

    const extractSections = (text) => {
        const experienceRegex = /Experience\s*(.*?)(Projects:|Online Courses|Achievements|$)/s;
        const projectsRegex = /Projects\s*(.*?)(Online Courses|Achievements|$)/s;

        const experienceMatch = text.match(experienceRegex);
        const projectsMatch = text.match(projectsRegex);

        if (experienceMatch && experienceMatch[1]) {
            setExperience(experienceMatch[1].trim());
        }

        if (projectsMatch && projectsMatch[1]) {
            setProjects(projectsMatch[1].trim());
        }
    };

    useEffect(() => {
        if (pdfUrl) {
            extractTextFromPdf(pdfUrl);
        }
    }, [pdfUrl]);

    return (
        <div>
            <h2>Experience:</h2>
            <pre>{experience}</pre>
            <h2>Projects:</h2>
            <pre>{projects}</pre>
        </div>
    );
};

export default PdfExtractor;
