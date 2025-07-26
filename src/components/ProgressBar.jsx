import React from 'react';

function ProgressBar({ progress, color = '#dc354599', height = '20px' }) {
  return (
    <div className="progress-container" style={{ height }}>
      <div
        className="progress-bar"
        style={{
          width: `${progress}%`,
          backgroundColor: color
        }}
      >
        <span className="progress-text"></span>
      </div>
    </div>
  );
}

export default ProgressBar;
