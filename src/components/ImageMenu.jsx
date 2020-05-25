import React, { useState, useEffect } from "react";
import "./ImageMenu.css";
import axios from "axios";
import useEventListener from "./../use-event-listener";

export const ImageMenu = ({ imageFromChoice, changeSafeZoneColor }) => {
  const [componentMounted, setComponentMounted] = useState(false);
  const [imageDb, setImageDB] = useState("");
  const [imageFocus, setImageFocus] = useState(0);
  const [currentIndexSafeColor, setCurrentIndexSafeColor] = useState(0);

  const fetchImages = () => {
    if (!componentMounted) {
      const dbUrl = "/images/images.json";
      axios.get(dbUrl).then((res) => {
        setImageDB(res.data);
        setComponentMounted(true);
      });
    }
  };

  const changeSafeColor = (e) => {
    const colors = ["red", "yellow", "blue", "black"];
    if (e.keyCode === 39) {
      if (currentIndexSafeColor === colors.length) {
        return;
      } else {
        setCurrentIndexSafeColor(currentIndexSafeColor + 1);
        changeSafeZoneColor(colors[currentIndexSafeColor]);
      }
    } else if (e.keyCode === 37) {
      if (currentIndexSafeColor === 0) {
        return;
      } else {
        setCurrentIndexSafeColor(currentIndexSafeColor + -1);
        changeSafeZoneColor(colors[currentIndexSafeColor]);
      }
    }
  };

  const changeFocusImage = (e) => {
    e.preventDefault();
    if (e.keyCode === 40) {
      if (imageFocus === imageDb.length) {
        setImageFocus(1);
        imageFromChoice(imageDb[0].url);
      } else {
        setImageFocus(imageFocus + 1);
        imageFromChoice(imageDb[imageFocus].url);
      }
    } else if (e.keyCode === 38) {
      if (imageFocus === 1) {
        setImageFocus(imageDb.length);
        imageFromChoice(imageDb[imageDb.length - 1].url);
      } else {
        setImageFocus(imageFocus - 1);
        imageFromChoice(imageDb[imageFocus - 1].url);
      }
    }
  };

  useEventListener("keydown", changeFocusImage);
  useEventListener("keydown", changeSafeColor);

  useEffect(() => {
    fetchImages();
  });

  return (
    <div className="ActionMenu" style={{ marginTop: "1.5%" }}>
      {imageDb && (
        <>
          {imageDb.map((image, index) => {
            return (
              <div
                className="image-option"
                style={{
                  backgroundColor: index + 1 === imageFocus ? "red" : "",
                }}
              >
                <div className="image-name">{image.url}</div>
                <div
                  className="mini-image"
                  style={{ backgroundImage: `url(${image.url})` }}
                ></div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};
