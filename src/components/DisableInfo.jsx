import React, { useState } from "react";
import "./DisableInfo.css";

export const DisableInfo = ({ buttonType }) => {
  return (
    <div className="info-box">
      <p className="text-info">
        Disable first the {buttonType === "board" ? "Board" : "Text"} Color
      </p>
      <div className="button">OK</div>
    </div>
  );
};
