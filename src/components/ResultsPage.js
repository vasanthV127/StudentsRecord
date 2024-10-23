import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

// Register required components for Chart.js
Chart.register(ArcElement, Tooltip, Legend);

const ResultsPage = ({ location }) => {
  const { checkResults } = location.state || {};

  if (!checkResults) {
    return <div>No results available. Please complete the interview first.</div>;
  }

  const chartData = {
    labels: ["Accuracy", "Clarity", "Conciseness", "Depth", "Relevance"],
    datasets: [
      {
        label: "Interview Results",
        data: [
          checkResults.averages.Accuracy,
          checkResults.averages.Clarity,
          checkResults.averages.Conciseness,
          checkResults.averages.Depth,
          checkResults.averages.Relevance,
        ],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
      },
    ],
  };

  return (
    <div className="results-page p-8 flex justify-center items-center min-h-screen bg-gray-100">
      <div className="chart-container bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Interview Results</h2>
        <Pie data={chartData} />
      </div>
    </div>
  );
};

export default ResultsPage;
