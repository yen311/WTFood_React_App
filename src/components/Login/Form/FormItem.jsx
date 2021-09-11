import React from "react";
import "./FormItem.scss";

const FormItem = React.forwardRef((props, ref) => {
  if (props.type === "email") {
    return (
      <React.Fragment>
        <label className="form-label" htmlFor={props.type}>
          {props.children}
        </label>
        <input
          onChange={props.onChange}
          onBlur={props.onBlur}
          onKeyDown={props.onKeyDown}
          className={`form-input ${props.className}`}
          id={props.type}
          type="email"
          ref={ref}
        ></input>
      </React.Fragment>
    );
  }
  if (props.type === "password" || props.type === "confirm") {
    return (
      <React.Fragment>
        <label htmlFor={props.type} className="form-label">
          {props.children}
        </label>
        <div>
          <input
            onChange={props.onChange}
            onBlur={props.onBlur}
            onKeyDown={props.onKeyDown}
            className={`form-input ${props.className}`}
            id={props.type}
            type="password"
            ref={ref}
          ></input>
          <i className="far fa-eye-slash" onClick={props.onClick}></i>
        </div>
      </React.Fragment>
    );
  }
  if (props.type === "firstname" || props.type === "lastname") {
    return (
      <React.Fragment>
        <label className="form-label" htmlFor={props.type}>
          {props.children}
        </label>
        <input
          onChange={props.onChange}
          onBlur={props.onBlur}
          onKeyDown={props.onKeyDown}
          ref={ref}
          className={`form-input ${props.className}`}
          id={props.type}
          type="text"
        ></input>
      </React.Fragment>
    );
  }

  return <div></div>;
});

export default FormItem;
