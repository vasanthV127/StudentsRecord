import React from 'react';
import { Pie } from 'react-chartjs-2';
import { useLocation } from 'react-router-dom';

const Results = () => {
  const location = useLocation();
  const { results } = location.state || {};

  // Prepare data for the Pie Chart
  const data = {
    labels: ['Accuracy', 'Clarity', 'Conciseness', 'Depth', 'Relevance'],
    datasets: [
      {
        label: 'Evaluation Metrics',
        data: [
          results?.Accuracy || 0,
          results?.Clarity || 0,
          results?.Conciseness || 0,
          results?.Depth || 0,
          results?.Relevance || 0
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)'
        ],
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="results-container">
      <h2>Interview Evaluation Results</h2>
      <Pie data={data} />
    </div>
  );
};

export default Results;
