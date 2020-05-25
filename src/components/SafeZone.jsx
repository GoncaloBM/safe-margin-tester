import React from "react";
import "./SafeZone.css";

export const SafeZone = ({ currentSafeZoneColor }) => {
  return (
    <>
      <div
        className="action-safe"
        style={{ border: `1px dashed ${currentSafeZoneColor}` }}
      ></div>
      <div
        className="title-safe"
        style={{ border: `1px dashed ${currentSafeZoneColor}` }}
      ></div>
    </>
  );
};
