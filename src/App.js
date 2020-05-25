import React, { useState } from "react";
import "./App.css";
import "./Board.css";
import { ColorPicker } from "./components/ColorPicker";
import { Board } from "./components/Board";
import useEventListener from "./use-event-listener";
import { ImageMenu } from "./components/ImageMenu";

function App() {
  const [boardColor, setBoardColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#000000");
  const [buttonType, setButtonType] = useState("");
  const [textOfColor, setTextOfColor] = useState(
    "Press right arrow to change board color and left arrow to change text color"
  );
  const [changingColor, setChangingColor] = useState(false);
  const [safeZoneVisible, setSafeZoneVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [colorType, setColorType] = useState("");
  const [DisableInfo, setDisableInfo] = useState(false);

  const showDisableInfo = (trueOrFalse) => {
    setDisableInfo(trueOrFalse);
  };

  //Make the Menu of Disable Information desappear with Enter
  const disableMenuOff = (e) => {
    if (DisableInfo && e.keyCode === 13) {
      setDisableInfo(false);
    }
  };

  const defineVisiblePalete = () => {
    setVisible(!visible);
  };

  const defineBoardColor = (color) => {
    if (buttonType === "board") {
      setBoardColor(color);
    }
  };

  const defineTextColor = (color) => {
    if (buttonType === "text") {
      setTextColor(color);
    }
  };

  const defineButton = (button) => {
    setButtonType(button);
  };

  const instructions = (rgbType) => {
    // alert(`hey ${buttonType}`)
    if (rgbType === 0) {
      setTextOfColor(
        "Press right arrow to change board color and left arrow to change text color"
      );
    } else if (rgbType === 1) {
      setTextOfColor("Changing red, press Enter to finnish that color");
      setColorType("red");
    } else if (rgbType === 2) {
      setTextOfColor("Changing green, press Enter to finnish that color");
      setColorType("green");
    } else if (rgbType === 3) {
      setTextOfColor("Changing blue, press Enter to finnish that color");
      setColorType("blue");
    }
  };

  const changeColor = () => {
    setChangingColor(!changingColor);
  };

  const showingSafeZone = (e) => {
    // if click on space it will show safeZone area
    if (e.keyCode === 32) {
      setSafeZoneVisible(!safeZoneVisible);
    }
  };

  useEventListener("keydown", showingSafeZone);
  useEventListener("keydown", disableMenuOff);

  return (
    <div className="App">
      <Board
        boardColor={boardColor}
        textColor={textColor}
        safeZoneVisible={safeZoneVisible}
        showingDisableInfo={DisableInfo}
        buttonType={buttonType}
      />

      <ImageMenu visible={visible}/>
    </div>
  );
}

export default App;
