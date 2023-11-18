import React from "react";
import cl from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={cl.wrapper_loader}>
      <div className={cl.loader}></div>
    </div>
  );
};

export default Loader;
