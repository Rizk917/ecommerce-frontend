import React from "react";
import { Link } from "react-router-dom";
import "./Error404.css";

const Error404 = () => {
  return (
    <>
    <div className="big-h">
      <h1 className="gradient-text text-h1 center">Error 404</h1>
      <h2>
        <Link className=" text-h2 " to="/">Click here to Go back home</Link>
      </h2></div>
    </>
  );
};

export default Error404;