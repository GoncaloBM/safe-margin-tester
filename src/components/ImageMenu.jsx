import React, { useState, useEffect } from "react";
import "./ImageMenu.css";
import axios from "axios";
import useEventListener from "./../use-event-listener";

export const ImageMenu = ({ visible }) => {
  const [componentMounted, setComponentMounted] = useState(false);
  const [imageDb, setImageDB] = useState("");
  const [imageFocus, setImageFocus] = useState(0);

  const fetchImages = () => {
    if (!componentMounted) {
      const dbUrl = "/images/images.json";
      axios.get(dbUrl).then((res) => {
        setImageDB(res.data);
        setComponentMounted(true);
      });
    }
  };

  const changeFocusImage = (e) => {
    e.preventDefault();
    if (e.keycode === 40) {
      alert("hey");
      setImageFocus(imageFocus + 1);
    } else if (e.keycode === 38) {
      alert("hey");
      setImageFocus(imageFocus - 1);
    }
  };

  useEventListener("keydown", changeFocusImage);

  useEffect(() => {
    fetchImages();
  });

  return (
    <div className="ActionMenu" style={{ marginTop: visible && "1.5%" }}>
      {imageDb && (
        <>
          {imageDb.map((image, index) => {
            return (
              <div
                className="image-option"
                style={{ backgroundColor: index === imageFocus ? "red" : "" }}
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
