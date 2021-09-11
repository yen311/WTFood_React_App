import React from "react";
import BackBtn from "../UI/BackBtn";
import "./NotFoundContent.scss";

function NotFoundContent() {
  return (
    <div className="notfound">
      <div className="background-notfound"></div>
      <BackBtn className="notfound-btn" to="/home" />
    </div>
  );
}

export default NotFoundContent;
