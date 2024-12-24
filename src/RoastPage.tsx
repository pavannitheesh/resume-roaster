import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from './components/ui/button';

function RoastPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Check if the location state is available
  const roastText = location.state?.roastText || "No roast generated yet.";
  const loading = location.state?.loading || false;

  if (loading) {
    return (
      <div className="loading">
        <p>Generating the roast... Please wait.</p>
      </div>
    );
  }

  return (
    <div className="roast-page">
      <Button
        onClick={() => navigate('/')}
        className="back-button mt-4 bg-gray-500 text-white px-4 py-2 rounded"
      >
        Back to Upload
      </Button>
      <h2 className="roast-title mt-4 text-xl font-bold">Resume Roast</h2>
      <div className="roast-text mt-2 bg-gray-100 p-4 rounded">
        <p>{roastText}</p>
      </div>
    </div>
  );
}

export default RoastPage;
