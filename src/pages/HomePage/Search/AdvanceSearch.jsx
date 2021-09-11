import React, { useState } from "react";
import AdvancedSearchItem from "./AdvancedSearchItem";
import "./AdvanceSearch.scss";

function AdvanceSearch() {
  const [open, setOpen] = useState(false);

  const toogleHandler = () => {
    setOpen(!open);
  };

  return (
    <div className="container-advanced">
      <div>
        <i
          className={open ? "fas fa-window-close" : "fas fa-sign-in-alt"}
          title="More Options"
          onClick={toogleHandler}
        ></i>
      </div>

      {open && <AdvancedSearchItem />}
    </div>
  );
}

export default AdvanceSearch;
