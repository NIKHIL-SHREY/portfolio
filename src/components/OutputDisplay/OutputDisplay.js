import React from 'react';
import './OutputDisplay.css';

const OutputDisplay = ({ output }) => {
  return (
    <div className="output-display" dangerouslySetInnerHTML={{ __html: output }} />
  );
};

export default OutputDisplay;
