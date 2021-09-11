import React from "react";
import "./FormHeader.scss";

function FormHeader(props) {
  return <div className="form-header">{props.children}</div>;
}

export default FormHeader;
