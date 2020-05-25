import React, { useState } from "react";
import { SafeZone } from "./SafeZone";
import "../fonts/fonts.css";

export const Board = ({
  safeZoneVisible,
  currentSafeZoneColor,
  backgroundImage,
}) => {
  const boardStyle = {
    backgroundImage: backgroundImage && `url(${backgroundImage})`,
  };

  return (
    <div className="wrapper">
      <div className="board" style={boardStyle}>
        {safeZoneVisible && (
          <SafeZone currentSafeZoneColor={currentSafeZoneColor} />
        )}
      </div>
    </div>
  );
};
