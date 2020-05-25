import React, { useState } from "react";
import "./App.css";
import "./Board.css";
import { ColorPicker } from "./components/ColorPicker";
import { Board } from "./components/Board";
import useEventListener from "./use-event-listener";

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

      <div className="ActionMenu" style={{ marginTop: visible && "1.5%" }}>
        <div
          className="hexaTab-top"
          style={{ top: visible && "67%", height: visible && "32%" }}
        >
          <p className="instructions">/ Instructions Keys /</p>
          <p className="keys">
            <strong>SPACE: </strong> Enable/disable Safe Margin
          </p>
          <p className="keys">
            <strong>RIGHT Arrow: </strong>Enable/disable Board Color
          </p>
          <p className="keys">
            <strong>LEFT Arrow: </strong>Enable/disable Text Color
          </p>
          <p className="keys">
            <strong>UP/DOWN Arrow:</strong> Run through RGB color
          </p>
          <p className="keys">
            <strong>+ / - : </strong>Increase/Decrease Font Size
          </p>
          <p className="keys">
            <strong>SHIFT: </strong>Enable/disable Peacock Font
          </p>
        </div>
        <div className="ActionButton" style={{ marginTop: !visible && "75%" }}>
          <div className="top"></div>
          <div className="pickerstyle2">
            <ColorPicker
              text={"Board"}
              defineColor={defineBoardColor}
              button={"board"}
              defineButton={defineButton}
              buttonType={buttonType}
              initialColor={boardColor}
              instructions={instructions}
              changeColor={changeColor}
              changingColor={changingColor}
              defineVisiblePalete={defineVisiblePalete}
              showDisableInfo={showDisableInfo}
            />
          </div>
          <div
            className="left"
            style={{
              marginTop: visible && "37%",
              marginLeft: visible && "24%",
            }}
          ></div>
          <div
            className="right"
            style={{ marginRight: visible && "15%" }}
          ></div>
          <div className="pickerstyle" style={{ marginTop: visible && "80%" }}>
            <ColorPicker
              text={"Text"}
              defineColor={defineTextColor}
              button={"text"}
              defineButton={defineButton}
              buttonType={buttonType}
              initialColor={textColor}
              instructions={instructions}
              changeColor={changeColor}
              changingColor={changingColor}
              defineVisiblePalete={defineVisiblePalete}
              showDisableInfo={showDisableInfo}
            />
          </div>
          <div className="down" style={{ marginTop: visible && "-32%" }}></div>
        </div>
        <div className="hexaTab" style={{ bottom: visible && "34%" }}>
          <p className="aligntext">{textOfColor}</p>
          {buttonType && (
            <>
              {/* <p className="aligntext">Changing {buttonType} color.</p> */}
              <p className="hexadecimal" style={{ color: colorType }}>
                {buttonType === "board" ? boardColor : textColor}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
