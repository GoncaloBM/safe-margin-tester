import React, { useState, useRef } from "react";
import { SketchPicker, Block } from "react-color";
import "./ColorPicker.css";
import useEventListener from "./../use-event-listener";
import { rgbToHex } from "./RGBtoHex";
import { hexToRGB } from "./RGBtoHex";
import useOnClickOutside from "../useOnClickOutside";
import { DisableInfo } from "./DisableInfo";

export const ColorPicker = ({
  defineColor,
  text,
  defineButton,
  buttonType,
  button,
  initialColor,
  instructions,
  changeColor,
  changingColor,
  defineVisiblePalete,
  showDisableInfo,
}) => {
  const [visiblePallete, setVisiblePallete] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState(initialColor);
  const [rgbColor, setRgbColor] = useState({
    choose: 0,
    r: hexToRGB(initialColor)[0],
    g: hexToRGB(initialColor)[1],
    b: hexToRGB(initialColor)[2],
  });
  const presetColors = [
    "#D0021B",
    "#F5A623",
    "#F8E71C",
    "#8B572A",
    "#7ED321",
    "#417505",
    "#BD10E0",
    "#9013FE",
    "#4A90E2",
    "#50E3C2",
  ];

  const keyCodesColors = [49, 50, 51, 52, 53, 54, 55, 56, 57, 48];

  const [isTV, setIsTV] = useState(false);
  const ref = useRef();

  useOnClickOutside(ref, () => setVisiblePallete(false));

  const defineColorWithKey = () => {
    setBackgroundColor(rgbToHex(rgbColor.r, rgbColor.g, rgbColor.b)); // This is to change the color in Color Picker
    defineColor(rgbToHex(rgbColor.r, rgbColor.g, rgbColor.b));
    instructions(rgbColor.choose);
  };

  const newRGBColor = (newOrdEndColor, typeColor, red, green, blue) => {
    if (newOrdEndColor) {
      setRgbColor({
        ...rgbColor,
        choose: typeColor,
        r: rgbColor.r + red,
        g: rgbColor.g + green,
        b: rgbColor.b + blue,
      });
    } else {
      setRgbColor({
        ...rgbColor,
        choose: rgbColor.choose + typeColor,
        r: rgbColor.r + red,
        g: rgbColor.g + green,
        b: rgbColor.b + blue,
      });
    }
    defineColorWithKey();
  };

  const openWithKeyboard = (e) => {
    e.preventDefault();

    if (
      changingColor &&
      ((buttonType === "text" && e.keyCode === 39) ||
        (buttonType === "board" && e.keyCode === 37))
    ) {
      showDisableInfo(true);
      return;
    }

    if (
      (e.keyCode === 37 && button === "text") ||
      (e.keyCode === 39 && button === "board")
    ) {
      setIsTV(true);
      if (!changingColor) {
        newRGBColor(true, 1, 0, 0, 0);
      } else {
        newRGBColor(true, 0, 0, 0, 0);
      }
      click();
      handleChangeCompleteTV(backgroundColor);
    }
  };

  const keyboardChoser = (e) => {
    e.preventDefault();
    if (visiblePallete && e.keyCode === 13) {
      if (rgbColor.choose === 3) {
        newRGBColor(true, 1, 0, 0, 0);
      } else {
        newRGBColor(false, 1, 0, 0, 0);
      }
    }

    if (rgbColor.choose === 1) {
      if (e.keyCode === 38) {
        // change red color with up arrow
        newRGBColor(false, 0, 1, 0, 0);
      } else if (e.keyCode === 40) {
        // change red color with down arrow
        newRGBColor(false, 0, -1, 0, 0);
      }
    }

    if (rgbColor.choose === 2) {
      if (e.keyCode === 38) {
        // change green color with up arrow
        newRGBColor(false, 0, 0, 1, 0);
      } else if (e.keyCode === 40) {
        // change green color with down arrow
        newRGBColor(false, 0, 0, -1, 0);
      }
    }

    if (rgbColor.choose === 3) {
      if (e.keyCode === 38) {
        // change blue color with up arrow
        newRGBColor(false, 0, 0, 0, 1);
      } else if (e.keyCode === 40) {
        // change blue color with down arrow
        newRGBColor(false, 0, 0, 0, -1);
      }
    }
  };

  const handleChangeComplete = (color) => {
    setBackgroundColor(color.hex);
    defineColor(color.hex);
  };

  const handleChangeCompleteTV = (color) => {
    setBackgroundColor(color);
    defineColor(color);
  };

  const click = () => {
    setVisiblePallete(!visiblePallete);
    defineVisiblePalete();
    changeColor();
    showDisableInfo(false);
    if (changingColor) {
      defineButton("");
      instructions(0);
    } else {
      defineButton(button);
      instructions(1);
    }
  };

  const colorWithNumber = (e) => {
    e.preventDefault();
    if (visiblePallete) {
      if (
        e.keyCode === 49 ||
        e.keyCode === 50 ||
        e.keyCode === 51 ||
        e.keyCode === 52 ||
        e.keyCode === 53 ||
        e.keyCode === 54 ||
        e.keyCode === 55 ||
        e.keyCode === 56 ||
        e.keyCode === 57 ||
        e.keyCode === 48
      ) {
        for (let i = 0; i < keyCodesColors.length; i++) {
          if (e.keyCode === keyCodesColors[i]) {
            setRgbColor({
              ...rgbColor,
              choose: 1,
              r: hexToRGB(presetColors[i])[0],
              g: hexToRGB(presetColors[i])[1],
              b: hexToRGB(presetColors[i])[2],
            });
            handleChangeCompleteTV(presetColors[i]);
          }
        }
      }
    }
  };

  useEventListener("keydown", keyboardChoser);
  useEventListener("keydown", openWithKeyboard);
  useEventListener("keydown", colorWithNumber);

  return (
    <div className="color-picker">
      <button
        style={{ backgroundColor: buttonType === button && "#20e22f" }}
        onClick={click}
      >
        {text}
      </button>
      {visiblePallete && (
        <div ref={ref}>
          <SketchPicker
            width={"250px"}
            color={backgroundColor}
            onChangeComplete={
              isTV ? handleChangeCompleteTV : handleChangeComplete
            }
            presetColors={presetColors}
          />
        </div>
      )}
    </div>
  );
};
