import React, { useRef, useState, useEffect } from "react";

function AdvancedSearchItem() {
  const [distance, setDistance] = useState(0);
  const [confirm, setConfirm] = useState(false);
  const [price, setPrice] = useState(null);

  const distanceRef = useRef(distance);
  const firstIconRef = useRef();
  const secondIconRef = useRef();
  const thirdIconRef = useRef();
  const fourthIconRef = useRef();

  const changeDistanceHandler = (e) => {
    setDistance(distanceRef.current.value);
  };
  const firstIconHandler = (e) => {
    if (!confirm) setPrice(1);
  };
  const secondIconHandler = () => {
    if (!confirm) setPrice(2);
  };
  const thirdIconHandler = () => {
    if (!confirm) setPrice(3);
  };
  const fourthIconHandler = () => {
    if (!confirm) setPrice(4);
  };
  const mouseRemoveHandler = () => {
    if (!confirm) setPrice(0);
  };

  const confrimHandler = () => {
    setConfirm(!confirm);
  };

  useEffect(() => {
    switch (price) {
      case 0:
        firstIconRef.current.style.color = "black";
        secondIconRef.current.style.color = "black";
        thirdIconRef.current.style.color = "black";
        fourthIconRef.current.style.color = "black";
        break;
      case 1:
        firstIconRef.current.style.color = "#f4b71f";
        break;
      case 2:
        firstIconRef.current.style.color = "#f4b71f";
        secondIconRef.current.style.color = "#f4b71f";
        break;
      case 3:
        firstIconRef.current.style.color = "#f4b71f";
        secondIconRef.current.style.color = "#f4b71f";
        thirdIconRef.current.style.color = "#f4b71f";
        break;
      case 4:
        firstIconRef.current.style.color = "#f4b71f";
        secondIconRef.current.style.color = "#f4b71f";
        thirdIconRef.current.style.color = "#f4b71f";
        fourthIconRef.current.style.color = "#f4b71f";
        break;
      default:
        return;
    }
  }, [price]);
  return (
    <div className="container-items">
      <div>
        <span>Price</span>
        <i
          className="fas fa-dollar-sign"
          onMouseOver={firstIconHandler}
          onMouseOut={mouseRemoveHandler}
          onClick={confrimHandler}
          ref={firstIconRef}
        ></i>
        <i
          className="fas fa-dollar-sign"
          onMouseOver={secondIconHandler}
          onMouseOut={mouseRemoveHandler}
          onClick={confrimHandler}
          ref={secondIconRef}
        ></i>
        <i
          className="fas fa-dollar-sign"
          onMouseOver={thirdIconHandler}
          onMouseOut={mouseRemoveHandler}
          onClick={confrimHandler}
          ref={thirdIconRef}
        ></i>
        <i
          className="fas fa-dollar-sign"
          onMouseOver={fourthIconHandler}
          onMouseOut={mouseRemoveHandler}
          onClick={confrimHandler}
          ref={fourthIconRef}
        ></i>
      </div>
      <div>
        <label>Rating</label>
        <input type="number" max="5" min="1" step="0.5"></input>
      </div>
      <div>
        <label>Only show opening</label>
        <input type="checkbox"></input>
      </div>
      <div>
        <label>Distance</label>
        <input
          type="range"
          ref={distanceRef}
          value={distance}
          onChange={changeDistanceHandler}
          min="0"
          max="50"
        ></input>
        <span>
          {distance} {distance === "50" ? "KM+" : "KM"}
        </span>
      </div>
    </div>
  );
}

export default AdvancedSearchItem;
