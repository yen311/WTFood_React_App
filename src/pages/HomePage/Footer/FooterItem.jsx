import React from "react";
import "./FooterItem.scss";
import { Link } from "react-router-dom";

function FooterItem(props) {
  return (
    <div className="footer-item">
      <h4>{props.title}</h4>
      {props.items.map((item, index) => {
        if (item.type === "inner") {
          return (
            <div className="footer-link" key={index}>
              <Link className="footer-link" to={item.link}>
                {item.name}
              </Link>
            </div>
          );
        }
        if (item.type === "outer") {
          return (
            <div className="footer-link" key={index}>
              <a className="footer-link" href={item.link}>
                {item.name}
              </a>
            </div>
          );
        }
        if (item.type === "none") {
          return (
            <div className="footer-link" key={index}>
              <p className="footer-link">{item.name}</p>
            </div>
          );
        }
        return <div />;
      })}
    </div>
  );
}

export default FooterItem;
