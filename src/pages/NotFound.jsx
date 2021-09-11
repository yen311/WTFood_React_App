import React from "react";
import NavBar from "../components/Nav/NavBar";
import NotFoundContent from "../components/NotFound/NotFoundContent";

function NotFound() {
  return (
    <React.Fragment>
      <NavBar></NavBar>
      <NotFoundContent></NotFoundContent>
    </React.Fragment>
  );
}

export default NotFound;
