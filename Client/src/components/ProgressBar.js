import React from "react";

const ProgressBar = (props) => {
  return (
    <div className="progress">
      <div
        className="progress-bar bg-success"
        role="progressbar"
        aria-valuenow={progress}
        style={{ width: progress + "%" }}
      ></div>
    </div>
  );
};

export default ProgressBar;
