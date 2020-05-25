
import React, { useState } from "react";
import { SafeZone } from "./SafeZone";
import useEventListener from "./../use-event-listener";
import "../fonts/fonts.css";
import { DisableInfo } from "./DisableInfo";

export const Board = ({
  textColor,
  boardColor,
  safeZoneVisible,
  showingDisableInfo,
  buttonType,
}) => {
  const [textSize, setTextSize] = useState(50);

  const [fontPeacock, setFontPeacock] = useState(false);

  const changeTextSize = (e) => {
    if (e.keyCode === 187) {
      setTextSize(textSize + 1);
    } else if (e.keyCode === 189) {
      setTextSize(textSize - 1);
    }
  };

  const changeFonctPeacock = (e) => {
    if (e.keyCode === 16) {
      setFontPeacock(!fontPeacock);
    }
  };

  useEventListener("keydown", changeTextSize);
  useEventListener("keydown", changeFonctPeacock);

  const boardStyle = {
    backgroundColor: showingDisableInfo
      ? `rgba(0, 0, 0, 0.5)`
      : `${boardColor}`,
    fontFamily: fontPeacock && "peacock",
  };

  const textStyle = {
    color: `${textColor}`,
    opacity: showingDisableInfo && "0.5",
  };

  return (
    <div className="wrapper">
      <div className="board" style={boardStyle}>
        {safeZoneVisible && <SafeZone />}
        {showingDisableInfo && <DisableInfo buttonType={buttonType} />}
        <div className="text" style={textStyle}>
          <h2 style={{ fontSize: `${textSize - 10}px` }}>
            Star Wars - The Last Jedi
          </h2>
          <h3 style={{ fontSize: `${textSize - 20}px` }} className="mediumtext">
            A small river named Duden flows by their place and supplies it.
          </h3>
          <h5 style={{ fontSize: `${textSize - 35}px` }} className="mediumtext">
            Far far away, behind the word mountains, far from the countries
            Vokalia and a Consonantia, there live the blind texts. Separated
            they live in Bookmarksgrove right at the coast of the Semantics, a
            large language ocean.
          </h5>
        </div>
      </div>
    </div>
  );
};