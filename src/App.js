import React, { useState } from "react";
import "./App.css";
import "./Board.css";
import { Board } from "./components/Board";
import useEventListener from "./use-event-listener";
import { ImageMenu } from "./components/ImageMenu";

function App() {
  const [boardImage, setBoardImage] = useState("");

  const [safeZoneVisible, setSafeZoneVisible] = useState(false);
  const [currentSafeZoneColor, setCurrentSafeZoneColor] = useState("black");

  const showingSafeZone = (e) => {
    // if click on space it will show safeZone area
    if (e.keyCode === 32) {
      setSafeZoneVisible(!safeZoneVisible);
    }
  };

  const changeSafeZoneColor = (color) => {
    setCurrentSafeZoneColor(color);
  };

  const imageFromChoice = (img) => {
    setBoardImage(img);
  };

  useEventListener("keydown", showingSafeZone);

  return (
    <div className="App">
      <Board
        safeZoneVisible={safeZoneVisible}
        backgroundImage={boardImage}
        currentSafeZoneColor={currentSafeZoneColor}
      />

      <ImageMenu
        imageFromChoice={imageFromChoice}
        changeSafeZoneColor={changeSafeZoneColor}
      />
    </div>
  );
}

export default App;
