import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import "./OptionsControl.scss";

export default function OptionsControl(props) {
  const [isInEditMode, setIsInEditMode] = useState(false);

  return (
    <div className="optionsContol">
      <button
        className="optionsControl__dots"
        onClick={() => setIsInEditMode(!isInEditMode)}
      >
        <span className="optionsControl__dots--dot"></span>
        <span className="optionsControl__dots--dot"></span>
        <span className="optionsControl__dots--dot"></span>
      </button>
      {isInEditMode ? (
        <div className="optionsControl__unfolded">
          <button
            className="optionsControl__unfolded--top"
            onClick={() => {
              props.modify();
              setIsInEditMode(false);
            }}
          >
            {" "}
            <FontAwesomeIcon icon={faPenToSquare} /> Modifier
          </button>
          <button
            className="optionsControl__unfolded--bottom"
            onClick={() => {
              props.delete();
              setIsInEditMode(false);
            }}
          >
            {" "}
            <FontAwesomeIcon icon={faTrashCan} /> Supprimer
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
